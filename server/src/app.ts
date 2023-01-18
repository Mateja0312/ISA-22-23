import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';
import {Op} from 'sequelize';
import {sequelize} from './sequelize';
import {User} from '../models/User'
import {Center} from '../models/Center'
import {Rating} from '../models/Rating'
import { Questionnaire, questions } from '../models/Questionnaire';
import { Feedback } from '../models/Feedback';
import { Appointment, AppointmentStatus } from '../models/Appointment';
import { ClientRequest } from 'http';
import path from 'path';
import { FeedbackResponse } from '../models/FeedbackResponse';

const publicPath = path.join(__dirname, '..', 'qrcodes', 'test.png');
qrcode.toFile(publicPath, JSON.stringify({id: 1}), { type: 'png' }, (err) => {
  if (err) throw err;
  console.log("QR code generated successfully");
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10), 
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

function sendQRcode(appointment: any, email: string){
        const filename = `appointment-${appointment.id}.png`
        const qrCodePath = path.join(__dirname, '..', 'qrcodes', filename);
        qrcode.toFile(qrCodePath, JSON.stringify(appointment), { type: 'png' }, (err) => {
          if (err) throw err;
          console.log("QR code generated successfully");
        });

        const mailOptions = {
          from: 'appointments@lastdrop.com',
          to: email,
          subject: 'Appointment QR Code',
          text: 'Appointment QR Code',
          html: `<p>Appointment QR Code</p><img src="http://localhost:3000/${filename}"/>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
}

async function getRecentAppointments(clientId: any, start: any) {
  const requestedDate = new Date(start);
  const limit = new Date(start);
  limit.setMonth(limit.getMonth() - 6);
  return await Appointment.findAll({
    where: {
      [Op.and]: [
        {
          client_id: {
            [Op.eq]: clientId,
          } 
        },
        {
          [Op.or]: [
            {status: {
            [Op.eq]: AppointmentStatus.COMPLETED
            }},
            {status: {
              [Op.eq]: AppointmentStatus.CLIENT_RESERVED
            }}
          ],
        },
        {
          start: {
            [Op.gte]: limit
          },
        },
        {
          end: {
            [Op.lte]: requestedDate
          },
        }

      ]
    }
  });
}

async function isPenalized(clientId: any){
  const penalties = await Appointment.findAll({
    where: {
      [Op.and]: [
        {
          client_id: {
            [Op.eq]: clientId,
          }
        },
        {
          status: {
            [Op.eq]: AppointmentStatus.FAILED
          }
        },
        {
          start: {
            [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      ]
    }
  });

  return penalties.length >= 3;
}

async function isTimeslotFree(center_id: number, client_id: number, start: string, end: string) {
  const appointments: any = await Appointment.findAll({
    include: { all: true },
    where: {
      [Op.and]: [
        {
          center_id: {
            [Op.eq]: center_id,
          } 
        },
        {
        [Op.or] : [
          {
            status: {
              [Op.not]: AppointmentStatus.CLIENT_CANCELED
            },
          },
          {
            client_id: {
              [Op.eq]: client_id
            },
          }
        ],
        },
        {[Op.or]: [
          {
            start: {
              [Op.between]: [start, end]
            },
          },
          {
            end: {
              [Op.between]: [start, end]
            },
          }
        ],
        }
      ]
    }
  });

  console.log(center_id, client_id, typeof start, typeof end, appointments.map((appointment: any) => appointment.get({ plain: true })));

  if (appointments.length) {
    return false;
  }
  return true;
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, response) => {
    response.send("Hello world!");
});

app.post("/register", async (req, res) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  newUser.active = 'unactivated'; 

  try {
    const createdUser = await User.create(newUser);

    const activationToken = jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const mailOptions = {
      from: "welcome@lastdrop.com",
      to: newUser.email,
      subject: "Account activation",
      html: `<p>Click the link below to activate your account:</p>
             <p><a href="${process.env.SERVER}/activate/${activationToken}">Activate my account</a></p>`
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/activate/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    await User.update({ active: 'activated' }, { where: { id } });

    res.redirect(`${process.env.CLIENT}/login`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user: any) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      user = user.get({ plain: true })

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.active === 'unactivated') {
        return res.status(401).json({ message: "You have not activated your account" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
      });

      res.cookie("token", token, { httpOnly: true });
      res.json({ token, user });
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/centers", async (req, res) => {
  const { name, address, rating, datetime, token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };

  const where: any = {};
  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }
  if (address) {
    where.address = { [Op.like]: `%${address}%` };
  }

  let centers = (await Center.findAll({ where, include: [Rating, Appointment]}));
  centers = centers.map((center: any) => {
    center = center.get({ plain: true }); 
    if(center.ratings) {
      center.rating = center.ratings.reduce((acc: number, rating: any) => acc + rating.rating, 0) / center.ratings.length
    }
    return center;
  });

  if (rating) {
    centers = centers.filter((center: any) => center.rating >= rating);
  }
  
  if (datetime) {
  
  const firstDate = new Date(datetime as string)
  const secondDate = new Date(new Date(datetime as string).getTime() + 60 * 60 * 1000)

  console.log(typeof datetime, datetime, typeof firstDate, JSON.stringify(firstDate), typeof secondDate, JSON.stringify(secondDate));
  console.log("datetime", !!datetime);


  (async function() {
    const result = (await Promise.all(centers.map(async(center) => ({
      value: center,
      include: await isTimeslotFree(center.id, id, firstDate.toISOString(), secondDate.toISOString())
    })))).filter(v => v.include).map(data => data.value);
    return result;
  })().then((result) => {
    res.json(result);
  }).catch((error: any) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  });
  } else {
    res.json(centers);
  }
});

app.get("/interactions", async (req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  try {
    let content : any = await Appointment.findAll({
      include: { all: true },
      where: { 
        client_id: id, 
        status: 'completed' 
      }
    });

    const interactions = content.reduce((acc: any, appointment: any) => {
      appointment = appointment.get({ plain: true });
      acc['centers'].push( appointment.center);
      acc['employees'].push( appointment.employee);
      return acc;
    }, {centers: [], employees: []});

    interactions.centers =  [...new Map(interactions.centers.map((item: any) => [item?.id, item])).values()]
    interactions.employees =  [...new Map(interactions.employees.map((item: any) => [item?.id, item])).values()]

    res.json(interactions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

});

app.get("/myResponseHistory", async (req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  let responses = await FeedbackResponse.findAll({
    include: [Feedback],
    where: {
      respondedBy: id, 
    }
  });
  res.json(responses);
});

app.get("/myVisits", async (req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  let responses = await Appointment.findAll({
    include: [Center],
    where: {
      client_id: id,
      [Op.or]: [
        {status: 'reserved'},
        {status: 'accepted'},
        {status: 'completed'}
      ]
    }
  });
  console.log("odgovor: ",responses)
  res.json(responses);
});

app.get("/feedbacksToRespond", async (req, res) => {
  let feedbackList : any = await Feedback.findAll({
    include: [FeedbackResponse],
  })
  feedbackList = feedbackList.map((f: any) => {
    return f.get({ plain: true })
  });
  feedbackList = feedbackList.filter((f: any) => !f.feedback_response) //svi feedbackovi gde je response null
  res.json(feedbackList);
});

app.get("/getMyResponses/:id", async (req, res) => {
  let response: any = await FeedbackResponse.findOne({
    include: [Feedback],
    where: {
      id: req.params.id
    }
  })
  res.json(response);
});

app.get("/feedbackById/:id", async (req, res) => {
  console.log("Sadrzaj req.params je: ",req.params);
  let feedback = await Feedback.findOne({
    where: {
      id: req.params.id,
    }
  })
  console.log("Sadrzaj feedbacka je: ",feedback);
  res.json(feedback);
});

app.get("/myFeedbackHistory", async (req, res) => {
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  let myFeedbacks = await Feedback.findAll({
  });
  myFeedbacks = myFeedbacks.map((f:any) => {
    return f.get({plain: true})
  });
  myFeedbacks = myFeedbacks.filter((f:any) => f.client_id == userId)
  console.log("Sadrzaj feedbacka je: ",myFeedbacks);
  res.json(myFeedbacks);
});

app.get("/center/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  const user = (await User.findOne({ where: { id: userId } })).get({ plain: true });
  
  try {
    let center : any = await Center.findOne({ where: { id }, include: [Rating, Appointment, User]});
    center = center.get({ plain: true }); 
    if(center.ratings) {
      center = {...center, rating: center.ratings.reduce((acc: number, rating: any) => acc + rating.rating, 0) / center.ratings.length}
    }

    if(user.role === 'client') {
      center.appointments = center.appointments.filter((appointment: any) => appointment.status !== AppointmentStatus.CLIENT_CANCELED || appointment.client_id === userId );
    }
    res.json(center);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/questionnaireQuestions", async (req, res) => {
  res.json(questions)
});

app.put("/profile", async(req, res) => {
  User.update(req.body, {
    where: {
      id: req.body.id
    }
  });
});

app.get("/questionnaire", async (req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  try {
    const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
    res.json(questionnaire ? JSON.parse(questionnaire.q_answers) : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/questionnaire", async(req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };

  const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
  if(questionnaire) {
    Questionnaire.update({q_answers: JSON.stringify(req.body)}, {
      where: {
        client_id: id
      }
    }).then(() => {
      res.status(200).json({message: 'Questionnaire updated'});
    }).catch((err: any) => {
      console.error(err);
      res.status(500).json(err);
    });
    return;
  }

  Questionnaire.create({q_answers: JSON.stringify(req.body), client_id: id})
  .then((createdQuestionnaire: any) => {
    res.status(201).json(createdQuestionnaire);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

app.post("/feedbackResponse", async(req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  req.body.respondedBy = id;
  
  console.log(req.body);
  FeedbackResponse.create(req.body)
  .then((feedbackResponse: any) => {
    res.status(201).json(feedbackResponse);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

app.post("/feedback", async(req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  req.body.client_id = id;
  Feedback.create(req.body)
  .then((createdFeedback: any) => {
    res.status(201).json(createdFeedback);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

app.post("/appointment", async(req, res) => {
  const newAppointment = req.body;
  const { id } = jwt.verify(newAppointment.token, process.env.JWT_SECRET as string) as { id: number };
  
  if (id !== newAppointment.user_id) {
    return res.status(401).json({ message: "Invalid token" });
  } 
  
  if (new Date(newAppointment.start) < new Date()) {
    return res.status(400).json({ message: "Invalid date" });
  }

  const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
  if(!questionnaire) {
    return res.status(400).json({ message: "Questionnaire not filled" });
  }

  if(await isPenalized(id)) {
    return res.status(400).json({ message: "You have exceeded the number of penalties for this month" });
  }

  const recentAppointments = await getRecentAppointments(id, newAppointment.start);

  if (recentAppointments.length) {
    return res.status(409).json({ message: "You already have an appointment in the last 6 months" });
  }

  if(!(await isTimeslotFree( newAppointment.center_id, id, newAppointment.start, newAppointment.end))){
    return res.status(409).json({ message: "Overlapping appointments" });
  } 

  delete newAppointment.token;
  delete newAppointment.user_id; 
  const user = (await User.findOne({ where: { id } })).get({ plain: true });
  newAppointment['client_id'] = user.role === 'client' ? id : null;
  newAppointment['status'] = user.role === 'client' ? 'reserved' : 'predefined';
  //newAppointment['employee'] = ...; //potrebno je pregledu dodeliti radnika 
  Appointment.create(newAppointment)
  .then((createdAppointment: any) => {
    
    if(user.role === 'client') {
      sendQRcode(createdAppointment, user.email);
    }
    res.status(201).json(createdAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
  
});

app.post("/appointment/:id", async(req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  const user = (await User.findOne({ where: { id: userId } })).get({ plain: true });

  const questionnaire = (await Questionnaire.findOne({ where: { client_id: userId } }))?.get({ plain: true });
  if(!questionnaire) {
    return res.status(400).json({ message: "Questionnaire not filled" });
  }

  const appointment = (await Appointment.findOne({ where: { id } })).get({ plain: true });
  appointment.client_id = userId;
  appointment.status = AppointmentStatus.CLIENT_ACCEPTED;

  if(await isPenalized(id)) {
    return res.status(400).json({ message: "You have exceeded the number of penalties for this month" });
  }

  const recentAppointments = await getRecentAppointments(id, appointment.start);

  if (recentAppointments.length) {
    return res.status(409).json({ message: "You already have an appointment in the last 6 months" });
  }

  Appointment.update(appointment, {
    where: { id }
  })
  .then((updatedAppointment: any) => {
    sendQRcode(appointment, user.email);
    res.status(201).json(updatedAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

app.delete("/appointment/:id", async(req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };

  const appointment = (await Appointment.findOne({ where: { id } })).get({ plain: true });

  if(appointment.client_id !== userId) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  const now = new Date();
  const start = new Date(appointment.start);
  const diff = start.getTime() - now.getTime();
  const diffHours = Math.ceil(diff / (1000 * 60 * 60));
  if (diffHours < 24) {
    return res.status(409).json({ message: "Can't cancel appointment less than 24 hours before" });
  }
  

  if(appointment.status === AppointmentStatus.CLIENT_ACCEPTED) {
    appointment.status = AppointmentStatus.PREDEFINED;
    appointment.client_id = null;   
  } else if (appointment.status === AppointmentStatus.CLIENT_RESERVED) {
    appointment.status = AppointmentStatus.CLIENT_CANCELED;
  }

  Appointment.update(appointment, {
    where: { id }
  })
  .then((updatedAppointment: any) => {
    res.status(201).json(updatedAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
  
});


(async () => {
  await sequelize.sync(); // mora bez {force: true} da se ne bi dropovale i ponovo pravile tabele pri pokretanju beka

  app.listen(8081);

})();

const qrcodes = express();
var dir = path.join(__dirname, '..', 'qrcodes');
qrcodes.use(express.static(dir));
qrcodes.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});
    