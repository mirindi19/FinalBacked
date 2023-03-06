import { Router } from "express";
import ProvinceController from "../controllers/provinceController";

const router = Router();
router.get("/allprovice",ProvinceController.getProvinces);
export default router
