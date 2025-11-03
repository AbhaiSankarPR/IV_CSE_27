const express = require("express");
const app = express();
const passport = require("./config/passport");

const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(passport.initialize());

app.use("/user", userRoutes);
app.use("/itinerary", itineraryRoutes);

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

module.exports = app;
