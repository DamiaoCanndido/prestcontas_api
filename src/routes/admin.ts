import express from "express";
import AdminController from "../controllers/AdminController";
import AuthAdminController from "../controllers/AuthAdiminController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post('/admin/auth', AuthAdminController.create);
router.post('/admin', AdminController.create);

// todas as rotas abaixo serão autenticadas
router.get('/admin', AuthMiddleware.auth, AuthMiddleware.protect(), AdminController.index);
router.delete('/admin/:id', AuthMiddleware.auth, AuthMiddleware.protect(), AdminController.destroy);

export default router;