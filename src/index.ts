import express from "express"; // Import express as a function
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRouter";
import cors from 'cors';

AppDataSource.initialize()
    .then(async () => {
        // MIDDLEWARE
        const app = express();

        app.use(bodyParser.json());
        app.use(cors());

        app.use("/public", userRouter);
        app.listen(3000);
        console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
    })
    .catch(error => console.log(error));
