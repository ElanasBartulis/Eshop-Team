import multer from "multer";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../assets/Private");
  },
  filename: (req, res, cb) => {
    cb(null, `${file.filename}`);
  },
});
// `${Date.now()}-${file.originalname}`
