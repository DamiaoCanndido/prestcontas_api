import express from "express";
import ZoneController from "../controllers/ZoneController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ProviderZoneController from "../controllers/UserZoneController";

const router = express.Router();

router.get('/zone', AuthMiddleware.auth, AuthMiddleware.protect("admin"/*admin provisório*/, "master"), ZoneController.index);
router.get('/myzones', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ZoneController.myZones);
router.get('/zone/:userId', AuthMiddleware.auth, ProviderZoneController.index);
router.post('/zone', AuthMiddleware.auth, AuthMiddleware.protect("admin", "master"), ZoneController.createByCoor);
router.delete('/zone/:id', AuthMiddleware.auth, AuthMiddleware.protect("admin", "master"), ZoneController.destroy);

export default router;