const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, async (req, res) => {

  try {
    const project = await Project.create({
      name: req.body.name,
      members: req.body.members || [],
      createdBy: req.user.id
    });
    res.json(project);
  } catch {
    res.status(500).json({ msg: "Error creating project" });
  }
});

// GET all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("members");
    res.json(projects);
  } catch {
    res.status(500).json({ msg: "Error fetching projects" });
  }
});

module.exports = router;