import express from "express";
import * as userHistoryController from "../controllers/userHistoryController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("History");
});

// router.get("/", userHistoryController.getAllProducts);
// router.get("/:id", userHistoryController.getProductById);
// router.post("/", userHistoryController.createProduct);

export default router;
