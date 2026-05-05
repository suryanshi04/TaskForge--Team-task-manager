const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ THIS LINE

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));

app.listen(5000, () => console.log("Server running on port 5000"));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});