import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config();
export const db=mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
    database: process.env.DATABASE,
});