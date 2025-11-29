const express = require("express");
const app = express();
const passport = require("./config/passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://iv-cse-27.vercel.app",
    credentials: true,
  })
);

app.use(
  helmet({
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
  })
);

app.use("/user", userRoutes);
app.use("/itinerary", itineraryRoutes);

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

module.exports = app;
