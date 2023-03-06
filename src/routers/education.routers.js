import { Router } from "express";
import educationCollectionController from "../controllers/EducationCollectionController";
import verifyToken from "../middelwares/verifyToken";
const router = Router();
router.post("/education",verifyToken,educationCollectionController.addEducationCollection);
router.get("/educationCollection",educationCollectionController.getEducationCollection);
router.delete("/deleteEducation/:id",educationCollectionController.deleteEducationCollection)
router.put("/updateEdColletion/:id",educationCollectionController.UpdateEducationCollection);
export default router