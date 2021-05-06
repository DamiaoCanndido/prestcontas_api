import express from "express";
import ZoneController from "../controllers/ZoneController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/zone', AuthMiddleware.auth, ZoneController.index);
router.post('/zone', /*AuthMiddleware.auth, AuthMiddleware.protect(),*/ ZoneController.createByCoor);
router.delete('/zone/:id', AuthMiddleware.auth, AuthMiddleware.protect(), ZoneController.destroy);

export default router;