import fs from "fs";
import path from "path";
import { privateFolder } from "../config/multerConfig.js";

export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send("File is too big or file format is not JPEG or PNG");
    }

    console.log("File uploaded:", req.file.filename);

    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
}

export async function deleteImage(req, res) {
  //Nurodyti failo pavadinima
  const { fileName } = req.params;
  // Rasti failo lokacija
  const filePath = path.join(privateFolder, fileName);

  try {
    // patikrinti ar egzistuoja
    if (fs.existsSync(filePath)) {
      // jei egzistuoja istrinti
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "File deleted successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.log("Delete error: ", error);
    res.status(500).json({ message: "Failed to delete file" });
  }
}
