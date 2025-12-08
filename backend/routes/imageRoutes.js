const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getPublicUrls,
  getSignedUrls,
  uploadImages,
} = require("../controllers/imageControllers");
const { verifyAccessToken } = require("../utils/tokens");

router.get("/public", async (req, res) => {
  const urls = await getPublicUrls("Images");
  res.json({ urls });
});

router.get("/private", verifyAccessToken, async (req, res) => {
  const urls = await getSignedUrls("Memories");
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

module.exports = router;
