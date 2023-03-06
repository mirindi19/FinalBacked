import { Router } from "express";
import authController from"../controllers/authController";
import checkUser from "../middelwares/checkUser";
import verifyToken from "../middelwares/verifyToken";
import isAdmin from "../middelwares/isAdmin";
const router = Router();

router.post("/sinup",authController.sinup);
router.post("/add-newuser-organization",authController.addNewUserAndOrganization);
router.delete("/deleteUser/:id",verifyToken,authController.deleteUser);
router.put("/updateUser/:id",authController.UpdateUser);
router.post("/login",checkUser,authController.Login);
router.post("/register",authController.creatAccount);
router.get("/users",authController.getUsers);
export default router