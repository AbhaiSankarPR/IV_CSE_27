const express = require("express");
const router = express.Router();

const {
  getPublicUrls,
  getSignedUrls,
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

router.post("/upload", verifyAccessToken, async (req, res) => {});

module.exports = router;
