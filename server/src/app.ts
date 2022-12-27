import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
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
    console.log("newUser", newUser)
    return;

    var usr = {
      first_name : newUser.firstName,
      last_name : newUser.lastName,
      email : newUser.email,
      password : bcrypt.hashSync( newUser.password, 10 )
    };
    const created_user = await db.User.create(usr);
    response.status(201).json(created_user);
});

app.listen(8081);
console.log("Server started.");
    