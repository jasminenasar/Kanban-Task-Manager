import React from "react";
import { Plus, LogOut } from "lucide-react";

export default function DashboardUI({
  tasks = [],
  title,
  setTitle,
  status,
  setStatus,
  addTask,
  deleteTask,
  moveTask,
  logout,
}) {
  const columns = [
    {
      key: "todo",
      title: "Todo",
      gradient: "from-pink-500 to-rose-500",
      card: "bg-rose-50 border-rose-200",
    },
    {
      key: "progress",
      title: "In Progress",
      gradient: "from-indigo-500 to-blue-500",
      card: "bg-blue-50 border-blue-200",
    },
    {
      key: "done",
      title: "Done",
      gradient: "from-emerald-500 to-green-500",
      card: "bg-green-50 border-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-800">Kanban Board</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white shadow hover:scale-105 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap gap-3 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-md
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option value="todo">Todo</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={addTask}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white shadow hover:scale-105 transition"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      

        {columns.map((col) => (
          <div key={col.key} className="rounded-3xl bg-white shadow-xl">
            <div
              className={`rounded-t-3xl px-4 py-3 text-white font-bold bg-gradient-to-r ${col.gradient}`}
            >
              {col.title}
            </div>

            <div className="p-4 space-y-3 min-h-[200px]">
              {tasks.filter((t) => t.status === col.key).length === 0 && (
                <p className="text-sm text-slate-400">No tasks</p>
              )}

              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <div
                    key={task._id}
                    className={`rounded-xl border p-3 shadow-sm ${col.card}`}
                  >
                    <p className="font-medium text-slate-800">{task.title}</p>

                    <div className="flex justify-between items-center mt-3">
                      <select
                        value={task.status}
                        onChange={(e) => moveTask(task._id, e.target.value)}
                        className="text-sm rounded-lg border px-2 py-1"
                      >
                        <option value="todo">Todo</option>
                        <option value="progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
