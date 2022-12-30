import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models'

db.sequelize.sync();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, response) => {
    response.send("Hello world!");
});

app.post("/register", async (req, response) => {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync( newUser.password, 10 )
    
    console.log("newUser", newUser)
    db.User.create(newUser)
    .then((createdUser: any) => {
      response.status(201).json(createdUser);
    })
    .catch((err: any)=>{
      console.log(err)
      response.status(500).json(err);
    })
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email } })
    .then((user: any) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      user = user.get({ plain: true })

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log(process.env.JWT_SECRET)

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


app.listen(8081);
console.log("Server started.");
    