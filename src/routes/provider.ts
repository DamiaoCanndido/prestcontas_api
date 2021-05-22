import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ProviderController from "../controllers/ProviderController";

const router = express.Router();

router.get('/provider', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.index);
router.get('/provider/:id', AuthMiddleware.auth, ProviderController.show);
router.post('/provider', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.create);
router.delete('/provider/:id', AuthMiddleware.auth, AuthMiddleware.protect("admin"), ProviderController.destroy);

export default router;