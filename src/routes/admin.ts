import express from "express";
import AdminController from "../controllers/AdminController";
import AuthUserController from "../controllers/AuthUserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post('/auth', AuthUserController.create);
router.post('/admin', AuthMiddleware.auth, AuthMiddleware.protect("master"), AdminController.create);

// todas as rotas abaixo serão autenticadas
router.get('/admin', AuthMiddleware.auth, AuthMiddleware.protect("admin", "master"), AdminController.index);
router.delete('/admin/:id', AuthMiddleware.auth, AuthMiddleware.protect("master"), AdminController.destroy);

export default router;