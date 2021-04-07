import express from "express";
import BenefitedController from "../controllers/BenefitedController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get('/benefited', AuthMiddleware.auth, BenefitedController.index);
router.get('/benefited/me', AuthMiddleware.auth, BenefitedController.myBenefiteds);
router.post('/benefited', AuthMiddleware.auth, BenefitedController.create);
router.put('/benefited/:id', AuthMiddleware.auth, BenefitedController.update);
router.delete('/benefited/:id', AuthMiddleware.auth, BenefitedController.destroy);

export default router;