const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ===== SERVE FRONTEND =====

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

// IMPORTANT: fallback WITHOUT "*"
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});