import express from "express";
import MasterController from "../controllers/MasterController";

const router = express.Router();

router.post('/master', MasterController.create);

export default router;