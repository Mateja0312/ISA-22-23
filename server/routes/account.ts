import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import {Router} from 'express';
import {User} from '../models/User'

export const account = Router();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10), 
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
});

account.put("/profile", async(req, res) => {
  User.update(req.body, {
    where: {
      id: req.body.id
    }
  });
});

account.post("/register", async (req, res) => {
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
  
      console.log('|~| *API REQUEST REORGANISATION WORKING* |~|');
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

account.get("/activate/:token", async (req, res) => { //ovo se ne poziva u requests ???
    const { token } = req.params;
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      await User.update({ active: 'activated' }, { where: { id } });
  
      console.log('|~| *API REQUEST REORGANISATION WORKING* |~|');
      res.redirect(`${process.env.CLIENT}/login`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

account.post("/login", async (req, res) => {
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
        console.log('|~| *API REQUEST REORGANISATION WORKING* |~|');
        res.json({ token, user });
      })
      .catch((error: any) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });
});