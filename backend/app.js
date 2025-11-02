const itineraryRoutes = require("./routes/itineraryRoutes");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/itinerary", itineraryRoutes);

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

module.exports = app;
