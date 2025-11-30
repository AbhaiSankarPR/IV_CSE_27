const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://iv-cse-27.vercel.app"
  ],
  credentials: true
}));


app.use("/user", userRoutes);
app.use("/itinerary", itineraryRoutes);

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

module.exports = app;
