const express = require("express");
const router = express.Router();
const {
  getItineraries,
  getUtensils,
  getSheetData,
} = require("../controllers/staticController");
const { verifyAccessToken } = require("../utils/tokens");

router.get("/itinerary", async (req, res) => {
  const data = await getItineraries();
  res.json(data);
});

router.get("/utensils", async (req, res) => {
  const data = await getUtensils();
  res.json(data);
});

router.get("/amount", verifyAccessToken, async (req, res) => {
  try {
    const data = await getSheetData();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch Google Sheet data" });
  }
});

module.exports = router;
