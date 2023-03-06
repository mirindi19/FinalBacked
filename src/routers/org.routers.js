import { Router } from "express";
import orgController from "../controllers/orgController";
import verifyToken from "../middelwares/verifyToken";
import isAdmin from "../middelwares/isAdmin";
const router = Router();

router.post("/AddOrganisation",orgController.addOrganisation);
router.get("/getOrganisation",orgController.getOrganization);
router.get("/organizationbyId",orgController.findOrgCollectionByCUserId);
router.get("/educationCollectionbyOrgId",orgController.findOrgEducationCollectionByCUserId);
router.delete("/deleteOrg/:id",verifyToken,orgController.deleteOrg);
router.put("/updateOrg/:id",orgController.UpdateOrg);
router.get("/total",orgController.getTotalNumberOfFemeleInOrganisationByEducationCollection);
router.get('/numbertoffemalebasedonsector',orgController.comparePrivateandPublicOrganization)
router.get('/numberoffemalebasedonprovince',orgController.compareOrganizationByProvince);
export default router