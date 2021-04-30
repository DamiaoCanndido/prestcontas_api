import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ProviderController from "../controllers/ProviderController";
import ProviderZoneController from "../controllers/UserZoneController";


const router = express.Router();

router.get('/provider', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderController.index);
router.get('/provider/:id', AuthMiddleware.auth, ProviderController.show);
router.post('/provider', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderController.create);
router.delete('/provider/:id', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderController.destroy);

router.get('/provider/zone', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderZoneController.index);
router.post('/provider/:zoneId', AuthMiddleware.auth, AuthMiddleware.protect(), ProviderZoneController.create);

export default router;