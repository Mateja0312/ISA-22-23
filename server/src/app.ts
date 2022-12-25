import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import db from '../models'

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

    const salt = await bcrypt.genSalt(10);
    var usr = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, salt)
    };
    const created_user = await db.User.create(usr);
    response.status(201).json(created_user);
});

app.listen(8081);
console.log("Server started.");
    