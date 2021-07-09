import express from "express";
import multer from "multer";
import SupplyController from "../controllers/SupplyController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { uploads } from "../config/multer";

const router = express.Router();

router.get('/supply', AuthMiddleware.auth, SupplyController.index);
router.get("/supply/provider", AuthMiddleware.auth, SupplyController.showByProvider);
router.post('/supply/:benefitedId', AuthMiddleware.auth, multer(uploads).array("photos"), SupplyController.create);
router.delete('/supply/:id', AuthMiddleware.auth, SupplyController.destroy);

export default router;