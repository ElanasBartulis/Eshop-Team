import express from "express";
import * as uploadController from "../controllers/uploadController.js";
import uploadMw from "../config/multerConfig.js";

const router = express.Router();

// http://srv701413.hstgr.cloud/server/api/image
router.post(
  "/image",
  uploadMw.single("addProduct"),
  uploadController.uploadImage
);

export default router;
