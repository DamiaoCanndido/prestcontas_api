import { Router } from "express";
import multer from "multer";
import BenefitedController from "./controllers/BenefitedController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SupplyController from "./controllers/SupplyController";
import ZoneController from "./controllers/ZoneController";
import DistrictController from "./controllers/DistrictController";
import StreetController from "./controllers/StreetController";

import { uploads } from "./config/multer";

const router = Router();


// todas as rotas abaixo serão autenticadas
router.use(AuthMiddleware.auth);

export { router };