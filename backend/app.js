const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const staticRoutes = require("./routes/staticRoutes");
const imageRoutes = require("./routes/imageRoutes");

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
app.use("/static", staticRoutes);
app.use("/images", imageRoutes);

module.exports = app;
