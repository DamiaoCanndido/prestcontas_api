import express from "express";
import ZoneController from "../controllers/ZoneController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/zone', AuthMiddleware.auth, AuthMiddleware.protect("admin"/*admin provisório*/, "boss"), ZoneController.index);
router.get('/myzones', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ZoneController.myZones);
router.post('/zone', AuthMiddleware.auth, AuthMiddleware.protect("admin", "boss"), ZoneController.createByCoor);
router.delete('/zone/:id', AuthMiddleware.auth, AuthMiddleware.protect("admin", "boss"), ZoneController.destroy);

export default router;