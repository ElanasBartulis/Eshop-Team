export async function uploadImage(req, res) {
  try {
    console.log("File uploaded:", req.file.filename);
    if (!req.file || req.file === undefined) {
      return res
        .status(400)
        .send("File is too big or file format is not JPEG or PNG");
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
}
