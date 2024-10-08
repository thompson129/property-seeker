import express from "express";
import authRoutes from "./router/auth.js";
import houseRoutes from './router/houseRoutes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
app.use(cors({
  origin
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth/", authRoutes);
app.use('/api/houses', houseRoutes);


app.listen(process.env.PORT, () => {
  console.log("Connected!");
});