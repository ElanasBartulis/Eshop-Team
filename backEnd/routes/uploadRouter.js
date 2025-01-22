import express from "express";
import * as uploadController from "../controllers/uploadController.js";
import uploadMw from "../config/multerConfig.js";

const router = express.Router();

// http://localhost/ server/api/image
router.post(
  "/image",
  uploadMw.single("addProduct"),
  uploadController.uploadImage
);

export default router;
