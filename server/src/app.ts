import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize';
import {sequelize} from './sequelize';
import {User} from '../models/User'
import {Center} from '../models/Center'
import {Rating} from '../models/Rating'
import { Questionnaire, questions } from '../models/Questionnaire';
import { Feedback } from '../models/Feedback';
import { Appointment, AppointmentStatus } from '../models/Appointment';
import { ClientRequest } from 'http';
import { FeedbackStatus } from "../models/Feedback";

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10), 
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

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
  const { name, address, rating } = req.query;

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

  try {
    
    res.json(centers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
        // status: 'completed' 
      }
    });

    const interactions = content.reduce((acc: any, appointment: any) => {
      appointment = appointment.get({ plain: true });
      acc['centers'].push( appointment.center);
      acc['employees'].push( appointment.employee);
      return acc;
    }, {centers: [], employees: []});

    // remove duplicates
    interactions.centers =  [...new Map(interactions.centers.map((item: any) => [item?.id, item])).values()]
    interactions.employees =  [...new Map(interactions.employees.map((item: any) => [item?.id, item])).values()]

    res.json(interactions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

});

app.get("/center/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  const user = (await User.findOne({ where: { id: userId } })).get({ plain: true });
  
  try {
    let center : any = await Center.findOne({ where: { id }, include: [Rating, Appointment]});
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

app.post("/questionnaire", async(req, res) => {
  Questionnaire.create({...req.body, q_answers: JSON.stringify(req.body.q_answers)})
  .then((createdQuestionnaire: any) => {
    res.status(201).json(createdQuestionnaire);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

app.post("/feedback", async(req, res) => {
  req.body.status = FeedbackStatus.PENDING;
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

  const appointments: any = await Appointment.findAll({
    include: { all: true },
    where: {
      [Op.and]: [
        {
          center_id: {
            [Op.eq]: newAppointment.center_id,
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
              [Op.eq]: id
            },
          }
        ],
        },
        {[Op.or]: [
          {
            start: {
              [Op.between]: [newAppointment.start, newAppointment.end]
            },
          },
          {
            end: {
              [Op.between]: [newAppointment.start, newAppointment.end]
            },
          }
        ],
        }
      ]
    }
  });

  if (appointments.length) {
    return res.status(409).json({ message: "Overlapping appointments" });
  } else {
    delete newAppointment.token;
    delete newAppointment.user_id; 
    const user = (await User.findOne({ where: { id } })).get({ plain: true });
    newAppointment[user.role + '_id'] = user.id;
    newAppointment['status'] = user.role === 'client' ? 'reserved' : 'predefined';
    Appointment.create(newAppointment)
    .then((createdAppointment: any) => {
      res.status(201).json(createdAppointment);
    })
    .catch((err: any)=>{
      console.error(err);
      res.status(500).json(err);
    })
  }
});

app.post("/appointment/:id", async(req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };


  const appointment = (await Appointment.findOne({ where: { id } })).get({ plain: true });
  appointment.client_id = userId;
  appointment.status = AppointmentStatus.CLIENT_ACCEPTED;

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
    