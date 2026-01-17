const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ SINGLE EXPORT (IMPORTANT)
module.exports = {
  createTask,
  getTasks,
  deleteTask,
};
