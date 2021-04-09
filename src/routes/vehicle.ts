import express from "express";
import VehicleController from "../controllers/VehicleController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/vehicle', AuthMiddleware.auth, VehicleController.index);
router.post('/vehicle/:userId', AuthMiddleware.auth, AuthMiddleware.protect(), VehicleController.create);

export default router;