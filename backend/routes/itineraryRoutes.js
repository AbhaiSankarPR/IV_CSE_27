const express = require("express");
const router = express.Router();
const { getItineraries } = require("../controllers/itineraryController");

router.get("/", async (req, res) => {
  const data = await getItineraries();
  res.json(data);
});

module.exports = router;
