import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import MasterController from "../controllers/MasterController";

const router = express.Router();

router.get('/master', AuthMiddleware.auth, AuthMiddleware.protect("master"), MasterController.index);
router.post('/master', MasterController.create);
router.delete('/master/:id', AuthMiddleware.auth, AuthMiddleware.protect("master"), MasterController.destroy);

export default router;