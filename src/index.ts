import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRouter";
import cors from 'cors';
import { logger } from "./middleware/logger";
import authRouter from "./routes/authRouter";

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        // Use body-parser to parse JSON data
            //app.use(bodyParser.json());

        // Enable CORS using the cors middleware
        //BuiltIn Express Middleware for application Level
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors());

        // Define your routes
        app.use(logger);
        app.use("/public", userRouter);
        app.use("/auth", authRouter)

        // Start the server
        app.listen(8000, () => {
            console.log("Express server has started on port 8000. Open http://localhost:8000/public/users to see results");
        });
    })
    .catch(error => console.log(error));
