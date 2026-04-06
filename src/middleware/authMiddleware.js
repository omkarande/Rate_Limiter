const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // No header → guest
  if (!authHeader) {
    req.user = null;
    return next();
  }

  // Must be Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }

  next();
};

module.exports = authMiddleware;
