import express from "express";
import * as uploadController from "../controllers/uploadController.js";
import uploadMw, { privateFolder } from "../config/multerConfig.js";

const router = express.Router();

// /server/api/image
router.post(
  "/image",
  uploadMw.array("addProduct", 3),
  uploadController.uploadImage
);

router.delete("/image/:fileName", uploadController.deleteImage);

router.use("/image", express.static(privateFolder));

export default router;
