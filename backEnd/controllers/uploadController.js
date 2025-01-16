export async function uploadImage(req, res) {
  try {
    console.log("File uploaded:", req.file);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
}
