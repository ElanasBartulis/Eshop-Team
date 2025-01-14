import { storage } from "./config/multerConfig.js";
import multer from "multer";

const upload = multer({ storage });
