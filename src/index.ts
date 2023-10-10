import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import userRouter from "./routes/userRouter"

AppDataSource.initialize()
    .then(async () => {

    // MIDDLEWARE
    const app = express();
    app.use(bodyParser.json());
    app.use("/public",userRouter);
    app.listen(3000);
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
