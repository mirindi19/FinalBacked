import {Router} from"express";
import authRouter from"./auth.routers";
import orgRouter from "./org.routers";
import provinceRouter from "./province.routers";
import districtRouter from"./district.routers";
import educationRouter from"./education.routers";
import collectionRouter from"./collection.routers";
const router =Router();

router.use("/auth",authRouter);
router.use("/organisation",orgRouter);
router.use("/province",provinceRouter);
router.use("/district",districtRouter);
router.use("/educationCollection",educationRouter);
router.use("/empCollection",collectionRouter);
export default router