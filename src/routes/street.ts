import express from "express";
import StreetController from "../controllers/StreetController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/street/:districtId', AuthMiddleware.auth, StreetController.index);
router.post('/street/:districtId', AuthMiddleware.auth, AuthMiddleware.protect(), StreetController.create);

export default router;