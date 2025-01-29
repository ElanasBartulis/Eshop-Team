import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsFolder = path.join(root, "assets");
export const privateFolder = path.join(assetsFolder, "Private");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, privateFolder);
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now() % 10000;
    cb(null, timeStamp + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false, "Invalid file type. Only JPEG and PNG files are allowed.");
  }
}

const uploadMw = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 3,
  },
});
export default uploadMw;
