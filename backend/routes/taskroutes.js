const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const { deleteTask } = require("../controllers/taskController");
const {
  createTask,
  getTasks,
} = require("../controllers/taskController.js");

const router = express.Router();


router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;