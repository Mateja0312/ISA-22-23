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

app.listen(8081);
console.log("Server started.");
    