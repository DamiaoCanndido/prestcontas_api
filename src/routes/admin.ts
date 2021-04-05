import express from "express";
import AdminController from "../controllers/AdminController";
import AuthAdminController from "../controllers/AuthAdiminController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post('/admin/auth', AuthAdminController.create);

// todas as rotas abaixo serão autenticadas
router.use(AuthMiddleware.auth);
router.use(AuthMiddleware.protect());

router.get('/admin', AdminController.index);
router.delete('/admin/:id', AdminController.destroy);

export default router;