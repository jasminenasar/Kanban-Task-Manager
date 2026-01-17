import React from "react";
import { LogOut, Plus } from "lucide-react";

export default function DashboardUI({
  tasks,
  title,
  setTitle,
  status,
  setStatus,
  addTask,
  deleteTask,
  logout,
  dark,
  toggleDark,
  moveTask,
}) {
  const statusStyles = {
    todo: {
      header: dark ? "text-blue-300" : "text-blue-700",
      bg: dark ? "bg-slate-800" : "bg-blue-50",
      border: dark ? "border-blue-400" : "border-blue-200",
      badge: dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700",
    },
    progress: {
      header: dark ? "text-yellow-300" : "text-yellow-700",
      bg: dark ? "bg-slate-800" : "bg-yellow-50",
      border: dark ? "border-yellow-400" : "border-yellow-200",
      badge: dark ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-700",
    },
    done: {
      header: dark ? "text-green-300" : "text-green-700",
      bg: dark ? "bg-slate-800" : "bg-green-50",
      border: dark ? "border-green-400" : "border-green-200",
      badge: dark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700",
    },
  };

  const Column = ({ title, statusKey }) => (
    <div className={`rounded-2xl shadow-sm p-4 flex flex-col ${statusStyles[statusKey].bg}`}>
      <h2 className={`font-semibold mb-3 ${statusStyles[statusKey].header}`}>{title}</h2>
      <div className="space-y-3 flex-grow overflow-auto max-h-[60vh]">
        {tasks.filter((t) => t.status === statusKey).map((task) => (
          <div
            key={task._id}
            className={`border rounded-xl p-3 flex justify-between items-center ${statusStyles[statusKey].border} bg-white dark:bg-gray-800`}
          >
            <span className="font-medium">{task.title}</span>
            <div className="flex items-center gap-2">
              <select
                value={task.status}
                onChange={(e) => moveTask(task._id, e.target.value)}
                className="text-sm border rounded-lg px-2 py-1"
              >
                <option value="todo">Todo</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete task"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
        {tasks.filter((t) => t.status === statusKey).length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No tasks</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={dark ? "min-h-screen bg-slate-900 text-slate-100" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"}>
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900 backdrop-blur border-b border-gray-300 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kanban Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDark}
            className="text-sm px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600"
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Add Task Form */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <form onSubmit={addTask} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex gap-3">
          <input
            type="text"
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring dark:bg-gray-900 dark:border-gray-700"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90"
          >
            <Plus size={16} /> Add Task
          </button>
        </form>

        {/* Kanban Columns */}
        <div className="grid md:grid-cols-3 gap-6">
          <Column title="Todo" statusKey="todo" />
          <Column title="In Progress" statusKey="progress" />
          <Column title="Done" statusKey="done" />
        </div>
      </main>
    </div>
  );
}
