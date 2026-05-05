const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= API ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));

// ================= TEST ROUTE =================
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ================= FRONTEND =================

// Path to React build
const buildPath = path.join(__dirname, "../client/build");

// Serve static files
app.use(express.static(buildPath));

// Safe fallback (ONLY if build exists)
app.use((req, res, next) => {
  const indexPath = path.join(buildPath, "index.html");

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  } else {
    return res.status(503).send("Frontend not built yet");
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});