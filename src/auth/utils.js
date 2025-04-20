const jwt = require("jsonwebtoken");

// Helper Functions
const generateToken = (userId, role) => {
  // Create access token (short-lived)
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET || "access_secret_key",
    { expiresIn: "15m" }
  );

  // Create refresh token (long-lived)
  const refreshToken = jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_SECRET || "refresh_secret_key",
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Auth Middleware
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header or cookie
  const authHeader = req.headers["authorization"];
  const token =
    (authHeader && authHeader.split(" ")[1]) || req.cookies.accessToken;

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "access_secret_key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based authorization middleware
const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

module.exports = {
  generateToken,
  authenticateToken,
  authorize,
};
