# 🚀 API Protection & Rate Limiting System

A backend project built to understand how real-world systems handle **API abuse, traffic control, and user-based request limiting**.

Instead of relying on external libraries, this project implements rate limiting logic from scratch using Node.js and Redis.

---

## 🧠 Problem Statement

Modern APIs must handle:
- High traffic
- Abuse (spam requests, bots)
- Fair usage across different users

This project explores how backend systems enforce **rate limits** efficiently and safely.

---

## ⚙️ Features

- 🚫 IP-based rate limiting (for guests)
- 👤 User-based rate limiting (using JWT)
- 🧩 Role-based limits:
  - Guest → 5 requests/min
  - Free User → 10 requests/min
  - Premium User → 50 requests/min
- ⚡ Sliding window rate limiting logic
-  🚀 Optimized implementation using Redis Sorted Sets (ZSET)
- 📦 Redis-based storage for scalability
- 🔐 JWT authentication middleware
- 📊 Rate limit headers:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
- 🧱 Clean middleware-based architecture

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- Redis
- JSON Web Tokens (JWT)
- Docker (optional)

---

## 📁 Project Structure
src/
│
├── config/
│ ├── redis.js
│ └── rateLimitConfig.js
│
├── middleware/
│ ├── authMiddleware.js
│ ├── rateLimiter.js
│ └── errorHandler.js
│
├── routes/
│ ├── authRoutes.js
│ └── testRoutes.js
│
├── utils/
│ └── rateLimiterHelper.js
│
├── app.js
└── server.js


## 🔐 Authentication Flow

- User gets token via:

GET /auth/login/:role/:id

- Token includes:
json
{ "id": "user_id", "role": "free | premium" }


🚦 Rate Limiting Logic
This project uses a **Sliding Window Algorithm** implemented with Redis.
Stores request timestamps in Redis
Filters requests within time window
Blocks requests beyond threshold

### Approach:

- Each request timestamp is stored in a Redis **Sorted Set (ZSET)**
- The timestamp is used as the score
- Old requests outside the time window are removed using:
ZREMRANGEBYSCORE

- Current request count is calculated using:

ZCARD

- If the count exceeds the limit → request is blocked

### Why ZSET?

Using Sorted Sets allows:
- Efficient removal of old requests
- Faster counting of requests within a time window
- Better scalability compared to list-based approaches

🧪 API Endpoints
🔹 Test Endpoint

GET /api/test

Headers (optional)

Authorization: Bearer <token>

🔹 Auth (Mock Login)

GET /auth/login/:role/:id


Examples:


/auth/login/free/101
/auth/login/premium/202

📊 Example Response Headers

X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1712345678900

🧪 Testing Scenarios
Guest vs authenticated users
Free vs premium limits
Multi-user isolation
Invalid token handling
Rate limit reset after time window

▶️ Running Locally
1. Clone repo

git clone <your-repo-link>
cd api-protection-system

2. Install dependencies

npm install

3. Setup environment

Create .env file:


PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=supersecret

4. Start Redis (Docker)

docker run -d -p 6379:6379 redis

5. Start server

npx nodemon src/server.js

🧠 Key Learnings
Difference between IP-based and user-based rate limiting
Importance of middleware order in Express
Handling authentication safely using JWT
Trade-offs in rate limiting strategies
Using Redis for scalable backend systems
