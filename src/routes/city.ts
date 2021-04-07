import express from "express";
import CityController from "../controllers/CityController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/city', AuthMiddleware.auth, CityController.index);
router.post('/city', AuthMiddleware.auth, AuthMiddleware.protect(), CityController.create);

export default router;