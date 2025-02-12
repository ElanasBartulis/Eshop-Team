import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();
// /server/api/product
router.get("/search", productController.getSearchedProduct);
router.get("/:id", productController.getProductById);
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProductById);

export default router;
