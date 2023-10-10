import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: !!process.env.POSTGRES_SYNC,
    logging: false,
    entities: ["build/entity/*.js", "build/entity/**/*.js"],
    migrations: [],
    subscribers: [],
})
