const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET all users (ADMIN ONLY)
router.get("/", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// UPDATE role (ADMIN ONLY)
router.put("/:id/role", auth, admin, async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch {
    res.status(500).json({ msg: "Error updating role" });
  }
});

module.exports = router;