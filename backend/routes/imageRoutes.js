const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getPublicUrls,
  getSignedUrls,
  uploadImages,
  deleteImage,
} = require("../controllers/imageControllers");
const { verifyAccessToken } = require("../utils/tokens");

router.get("/public", async (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 20;

  const urls = await getPublicUrls("Images", offset, limit);
  res.json({ urls });
});

router.get("/private", verifyAccessToken, async (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 20;

  const urls = await getSignedUrls("Memories", offset, limit);
  res.json({ urls });
});

router.post(
  "/upload",
  verifyAccessToken,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const bucket = req.query.bucket;
      const files = req.files;

      if (!bucket) return res.status(400).json({ error: "Bucket required" });
      if (!files.length)
        return res.status(400).json({ error: "Files missing" });

      await uploadImages(files, bucket);
      return res.status(200).json({
        message: "Uploaded successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/delete", verifyAccessToken, async (req, res) => {
  try {
    const { bucket, file } = req.query;

    if (!bucket) return res.status(400).json({ error: "Bucket is required" });
    if (!file) return res.status(400).json({ error: "File name is required" });

    const result = await deleteImage(bucket, file);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
