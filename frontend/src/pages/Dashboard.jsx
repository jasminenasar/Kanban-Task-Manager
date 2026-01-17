import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // 🔹 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 ADD TASK
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await API.post("/tasks", { title, status: "todo" });
      setTitle("");
      fetchTasks(); // refresh list
    } catch (error) {
      alert("Failed to add task");
    }
  };

  // 🔹 DELETE TASK
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  //LOGOUT
  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <hr />

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} ({task.status})
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;





