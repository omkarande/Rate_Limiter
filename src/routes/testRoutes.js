const express = require("express");
const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/test", authMiddleware, rateLimiter, (req, res) => {
  res.json({
    message: "Request successful",
    user: req.user || "Guest",
  });
});

module.exports = router;
