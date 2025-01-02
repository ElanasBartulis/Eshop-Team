import express from "express";
import adminRouter from "./adminRouter.js";
import productRouter from "./ProductRouter.js";
import userHistoryRouter from "./userHistoryRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

// http://localhost/server/api/
router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/history", userHistoryRouter);

export default router;
