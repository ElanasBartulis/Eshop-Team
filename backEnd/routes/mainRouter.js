import express from "express";
import productRouter from "./ProductRouter.js";
import userHistoryRouter from "./userHistoryRouter.js";
import userRouter from "./userRouter.js";
import ratingRouter from "./ratingRouter.js";
import uploadRouter from "./uploadRouter.js";
import cartRouter from "./cartRouter.js";
const router = express.Router();

// /server/api/
router.use("/rating", ratingRouter);
router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/history", userHistoryRouter);
router.use("/upload", uploadRouter);
router.use("/cart", cartRouter);

export default router;
