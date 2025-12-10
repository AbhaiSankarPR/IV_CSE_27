const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const staticRoutes = require("./routes/staticRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://iv-cse-27.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("--- Incoming Origin:", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(/.*/, cors());

app.use(
  helmet({
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/static", staticRoutes);
app.use("/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("Firebase Express server is running!");
});

module.exports = app;
