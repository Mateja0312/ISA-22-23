import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize';
import {sequelize} from './sequelize';
import {User} from '../models/User'
import {Center} from '../models/Center'
import { Questionnaire, questions } from '../models/Questionnaire';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, response) => {
    response.send("Hello world!");
});

app.post("/register", async (req, res) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  newUser.active = 'unactivated'; // add this field to track whether the user has activated their account

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
  const { name, address } = req.query;

  const where: any = {};
  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }
  if (address) {
    where.address = { [Op.like]: `%${address}%` };
  }

  try {
    const centers = await Center.findAll({ where });
    res.json(centers);
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

(async () => {
  await sequelize.sync(); // mora bez {force: true} da se ne bi dropovale i ponovo pravile tabele pri pokretanju beka

  app.listen(8081);
})();
    