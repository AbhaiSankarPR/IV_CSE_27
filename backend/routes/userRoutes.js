const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const passport = require("../config/passport");
const { getUser, createUser } = require("../controllers/userController");
const { generateTokens } = require("../utils/tokens");
require("dotenv").config();

router.use(cookieParser());

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const authHeader = req.headers["authorization"];
    const { ADMIN_PASSKEY } = process.env;

    const [scheme, passkey] = authHeader.split(" ");
    if (scheme !== "AdminKey" || passkey !== ADMIN_PASSKEY) {
      return res
        .status(403)
        .json({ message: "User doesn't have admin privilege" });
    }

    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    const { accessToken, refreshToken } = generateTokens(newUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Profile created successfully!",
      accessToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
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

    const { accessToken, refreshToken } = generateTokens(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = jwt.sign(
          { email: decoded.email, id: decoded.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    res.cookie("refreshToken", "", {
      ...cookieOptions,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during logout" });
  }
});

module.exports = router;
