import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AuthProviderController from "../controllers/AuthProviderController";
import ProviderController from "../controllers/ProviderController";
import ProviderZoneController from "../controllers/UserZoneController";


const router = express.Router();

router.post('/provider/auth', AuthProviderController.create);

router.get('/provider', AuthMiddleware.auth, ProviderController.index);
router.get('/provider/:id', AuthMiddleware.auth, ProviderController.show);
router.get('/provider/auth', AuthMiddleware.auth, AuthProviderController.logout);
router.post('/provider', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderController.create);
router.delete('/provider/:id', AuthMiddleware.auth, ProviderController.destroy);

router.get('/provider/zone', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderZoneController.index);
router.post('/provider/:zoneId', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderZoneController.create);

export default router;