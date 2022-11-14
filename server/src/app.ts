import express from 'express';
import cors from 'cors';
// import jwt from 'jsonwebtoken';
import { ResultSetHeader } from 'mysql2';
// import { User } from '../../model';
import { db } from './db/service';

console.log(db)

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, response) => {
    response.send("Hello world!");
});

app.listen(8081);
console.log("Server started.");
