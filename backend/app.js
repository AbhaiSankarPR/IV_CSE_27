const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");
const utensilRoutes = require("./routes/utensilRoutes");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://iv-cse-27.vercel.app"],
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

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

app.use("/user", userRoutes);
app.use("/itinerary", itineraryRoutes);
app.use("/utensils", utensilRoutes);

module.exports = app;
