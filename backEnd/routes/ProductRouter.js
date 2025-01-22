import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();
// http://localhost/ server/api/product
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProductById);

export default router;
