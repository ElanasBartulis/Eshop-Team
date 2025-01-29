import fs from "fs";
import path from "path";
import { privateFolder } from "../config/multerConfig.js";

export async function uploadImage(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .send("No files uploaded or files are too big or wrong format");
    }
    // Log all file names
    const uploadedFiles = req.files.map((file) => file.filename);
    console.log("Files uploaded:", uploadedFiles);

    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
      filename: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
}

export async function deleteImage(req, res) {
  //Nurodyti failu pavadinimus (atskirti su , )
  const fileNames = req.params.fileName.split(",").filter(Boolean);

  // Serveris gali priimti tik 1 response todel sitas egzistuoja
  let allFilesDeleted = true;

  try {
    for (const fileName of fileNames) {
      // Rasti failo lokacija
      const filePath = path.join(privateFolder, fileName);

      // patikrinti ar egzistuoja
      if (fs.existsSync(filePath)) {
        // jei egzistuoja istrinti
        fs.unlinkSync(filePath);
      } else {
        // jei (ne)egzistuoja
        allFilesDeleted = false;
      }
    }

    if (allFilesDeleted) {
      res.status(200).json({ message: "All files deleted successfully" });
    } else {
      res.status(404).json({ message: "Delete files not found" });
    }
  } catch (error) {
    console.log("Delete error: ", error);
    res.status(500).json({ message: "Failed to delete files" });
  }
}
