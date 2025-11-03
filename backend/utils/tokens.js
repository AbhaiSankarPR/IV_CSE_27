require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

function generateTokens(user) {
  const accessToken = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { email: user.email, id: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
}

module.exports = { generateTokens };
