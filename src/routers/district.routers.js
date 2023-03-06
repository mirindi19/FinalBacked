import { Router } from "express";
import DistrictController from "../controllers/districtController";

const router = Router();
router.get("/:id",DistrictController.getDistrictByprovinceId);
export default router