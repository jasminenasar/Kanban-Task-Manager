import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardUI from "../components/DashboardUI";



function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [dark, setDark] = useState(false);
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
    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title, status });
      setTitle("");
      setStatus("todo");
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
  const moveTask = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch {
      alert("Failed to update task status");
    }
  };

  //LOGOUT
  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
  const toggleDark = () => setDark(!dark);

  return (
   
    <DashboardUI
      tasks={tasks}
      title={title}
      setTitle={setTitle}
      status={status}
      setStatus={setStatus}
      addTask={addTask}
      deleteTask={deleteTask}
      logout={logout}
      dark={dark}
      toggleDark={toggleDark}
      moveTask={moveTask}
    />
  );
}

export default Dashboard;





