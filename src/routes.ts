import { Router } from "express";
import multer from "multer";
import ProviderController from "./controllers/ProviderController";
import AuthProviderController from "./controllers/AuthProviderController";
import BenefitedController from "./controllers/BenefitedController";
import ProviderZoneController from "./controllers/ProviderZoneController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SupplyController from "./controllers/SupplyController";
import ZoneController from "./controllers/ZoneController";
import CityController from "./controllers/CityController";
import DistrictController from "./controllers/DistrictController";
import StreetController from "./controllers/StreetController";

import { uploads } from "./config/multer";

const router = Router();


router.post('/provider/auth', AuthProviderController.create);

// todas as rotas abaixo serão autenticadas
router.use(AuthMiddleware.auth);


router.get('/provider/auth', AuthProviderController.logout);

router.get('/provider', ProviderController.index);
router.post('/provider', AuthMiddleware.protect(), ProviderController.create);
router.delete('/provider/:id', ProviderController.destroy);

router.get('/benefited', BenefitedController.index);
router.get('/benefited/me', BenefitedController.myBenefiteds);
router.post('/benefited', BenefitedController.create);
router.put('/benefited/:id', BenefitedController.update);
router.delete('/benefited/:id', BenefitedController.destroy);

router.get('/supply', SupplyController.index);
router.post('/supply/:benefitedId', multer(uploads).array("photos"), SupplyController.create);
router.delete('/supply/:id', SupplyController.destroy);

router.get('/zone', ZoneController.index);
router.post('/zone', AuthMiddleware.protect(), ZoneController.create);
router.delete('/zone/:id', AuthMiddleware.protect(), ZoneController.destroy);

router.get('/city', CityController.index);
router.post('/city', AuthMiddleware.protect(), CityController.create);

router.get('/district/:cityId', DistrictController.index);
router.post('/district/:cityId', AuthMiddleware.protect(), DistrictController.create);

router.get('/street/:districtId', AuthMiddleware.protect(), StreetController.index);
router.post('/street/:districtId', AuthMiddleware.protect(), StreetController.create);

router.get('/provider/zone', AuthMiddleware.protect(), ProviderZoneController.index);
router.post('/provider/:zoneId', AuthMiddleware.protect(), ProviderZoneController.create);

export { router };