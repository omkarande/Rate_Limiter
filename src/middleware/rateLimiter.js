const rateLimiter = require("../utils/rateLimiterHelper.js");
const { LIMITS } = require("../config/rateLimitConfig.js");

const rateLimiterMiddleware = async (req, res, next) => {
  //const ip = req.ip;  // this was for specific IP
  //const allowed = await rateLimiter(ip);

  let key;
  let maxRequests;
  const windowSize = 60;

  if (!req.user) {
    // Guest
    key = `rate_limit:ip:${req.ip}`;
    maxRequests = LIMITS.GUEST;
  } else if (req.user.role === "premium") {
    // Premium user
    key = `rate_limit:user:${req.user.id}`;
    maxRequests = LIMITS.PREMIUM;
  } else {
    // Free user
    key = `rate_limit:user:${req.user.id}`;
    maxRequests = LIMITS.FREE;
  }

  const result = await rateLimiter(key, maxRequests, windowSize);

  res.setHeader("X-RateLimit-Limit", maxRequests);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  res.setHeader("X-RateLimit-Reset", result.resetTime);

  if (!result.allowed) {
    return res.status(429).json({
      message: "Too many requests , try again later.",
    });
  }
  next();
};
module.exports = rateLimiterMiddleware;
