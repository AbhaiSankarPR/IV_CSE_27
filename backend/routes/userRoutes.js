const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");
const { getUser, createUser } = require("../controllers/userController");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const authHeader = req.headers["authorization"];
    const { ADMIN_PASSKEY } = process.env;

    const [scheme, passkey] = authHeader.split(" ");
    if (scheme !== "AdminKey" || passkey !== ADMIN_PASSKEY) {
      return res
        .status(400)
        .json({ message: "User doesn't have admin privilage" });
    }

    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    const token = jwt.sign(
      { email: newUser.email, id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Logged out successfully" });
  }
);

module.exports = router;
