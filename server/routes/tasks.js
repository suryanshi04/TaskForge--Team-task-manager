const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// CREATE TASK (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

// GET ALL TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("projectId");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (
      req.user.role !== "admin" &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("assignedTo")
      .populate("projectId");

    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Error updating task" });
  }
});

module.exports = router;