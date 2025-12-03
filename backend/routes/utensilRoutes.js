const express = require("express");
const router = express.Router();
const { getUtensils } = require("../controllers/utensilController");

router.get("/", async (req, res) => {
  const data = await getUtensils();
  res.json(data);
});

module.exports = router;
