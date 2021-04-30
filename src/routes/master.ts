import express from "express";
import MasterController from "../controllers/MasterController";
import AuthMasterController from "../controllers/AuthMasterController";

const router = express.Router();

router.post('/master/auth', AuthMasterController.create);
router.post('/master', MasterController.create);

export default router;