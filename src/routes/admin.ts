import express from "express";
import AdminController from "../controllers/AdminController";
import AuthUserController from "../controllers/AuthUserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post('/auth', AuthUserController.create);
router.post('/admin', AdminController.create);

// todas as rotas abaixo serão autenticadas
router.get('/admin', AuthMiddleware.auth, AuthMiddleware.protect(), AdminController.index);
router.delete('/admin/:id', AuthMiddleware.auth, AuthMiddleware.protect(), AdminController.destroy);

export default router;