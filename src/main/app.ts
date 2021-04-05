import "reflect-metadata";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import "../database";
import { router } from "../routes";
import adminRoute from "../routes/admin";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(adminRoute);
app.use(router);

export { app };