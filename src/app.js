const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
app.use("/api", testRoutes);
app.use(errorHandler);
app.use("/auth", authRoutes);

module.exports = app;
