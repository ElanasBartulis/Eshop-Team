import express from "express";
import adminRouter from "./adminRouter.js";
const router = express.Router();

router.use("/admin", adminRouter);

export default router;
