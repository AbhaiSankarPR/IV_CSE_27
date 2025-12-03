const express = require("express");
const router = express.Router();
const {
  getItineraries,
  getUtensils,
} = require("../controllers/staticController");

router.get("/itinerary", async (req, res) => {
  const data = await getItineraries();
  res.json(data);
});

router.get("/utensils", async (req, res) => {
  const data = await getUtensils();
  res.json(data);
});

module.exports = router;
