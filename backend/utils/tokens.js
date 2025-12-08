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

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid auth scheme. Use Bearer token." });
  }

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { generateTokens, verifyAccessToken };
