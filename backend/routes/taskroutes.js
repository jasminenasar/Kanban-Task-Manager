const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET all tasks
router.get("/", getTasks);

// CREATE task
router.post("/", createTask);

// UPDATE task (status move)
router.put("/:id", updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;
