const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  createTask,
  getTasks,
} = require("../controllers/taskController.js");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);

module.exports = router;