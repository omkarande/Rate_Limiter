const redis = require("../config/redis.js");

const rateLimiter = async (key, maxRequests, windowSize) => {
  const currentTime = Date.now();
  const windowStart = currentTime - windowSize * 1000;

  //const requests = await redis.lrange(key, 0, -1); //without using ZSET of redis

  //const validRequests = requests.filter((timestamp) => timestamp > windowStart); we do not remove old requests here

  await redis.zremrangebyscore(key, 0, windowStart); // Remove old requests

  const requestCount = await redis.zcard(key); // Count current requests

  if (requestCount >= maxRequests) {
    const oldestRequest = await redis.zrange(key, 0, 0, "WITHSCORES");
    const resetTime = oldestRequest[1] + windowSize * 1000;

    return {
      allowed: false,
      remaining: 0,
      resetTime,
    };
  }

  // if (validRequests.length >= maxRequests) {
  //   return false;
  // }

  //await redis.rpush(key, currentTime);
  await redis.zadd(key, currentTime, `${currentTime}-${Math.random()}`); // Add current request and also avoid collision of requests sent on same millisecond
  await redis.expire(key, windowSize);

  return {
    allowed: true,
    remaining: maxRequests - requestCount - 1,
    resetTime: currentTime + windowSize * 1000,
  };
};

module.exports = rateLimiter;
