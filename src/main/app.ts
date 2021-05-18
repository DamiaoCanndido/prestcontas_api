import "reflect-metadata";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import "../database";
import adminRoute from "../routes/admin";
import masterRoute from "../routes/master";
import providerRoute from "../routes/provider";
import vehicleRoute from "../routes/vehicle";
import benefitedRoute from "../routes/benefited";
import zoneRoute from "../routes/zone";
import supplyRoute from "../routes/supply";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files", express.static(path.resolve(__dirname, "..", "..", "uploads")));

app.use(adminRoute);
app.use(masterRoute);
app.use(providerRoute);
app.use(vehicleRoute);
app.use(zoneRoute);
app.use(benefitedRoute);
app.use(supplyRoute);

export { app };