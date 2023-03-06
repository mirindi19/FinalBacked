import { Router } from "express";
import collectionController from "../controllers/collectionController";
import verifyToken from "../middelwares/verifyToken";
const router = Router();
router.post("/collection",verifyToken,collectionController.addCollectionController)
router.get("/collection",collectionController.getCollectionEmp);
router.put("/updateCollection/:id",collectionController.UpdateCollection);
router.delete("/deleteCollection/:id",collectionController.deleteCollection);
export default router