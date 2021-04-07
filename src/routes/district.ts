import express from "express";
import DistrictController from "../controllers/DistrictController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/district/:cityId', AuthMiddleware.auth, DistrictController.index);
router.post('/district/:cityId', AuthMiddleware.auth, AuthMiddleware.protect(), DistrictController.create);

export default router;