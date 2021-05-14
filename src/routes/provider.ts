import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ProviderController from "../controllers/ProviderController";
import ProviderZoneController from "../controllers/UserZoneController";


const router = express.Router();

router.get('/provider', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.index);
router.get('/provider/:id', AuthMiddleware.auth, ProviderController.show);
router.post('/provider', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.create);
router.delete('/provider/:id', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.destroy);

router.post('/provider/:zoneId', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderZoneController.create);

export default router;