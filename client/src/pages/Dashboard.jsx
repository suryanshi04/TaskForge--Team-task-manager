import { useEffect, useState } from "react";
import api from "../utils/axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");

  // 🔐 Decode user safely
  const token = localStorage.getItem("token");

  let currentUser = null;

  if (token && token.includes(".")) {
    try {
      currentUser = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token");
    }
  }

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await api.get("/tasks");
        const projectsRes = await api.get("/projects");

        setTasks(tasksRes.data);
        setProjects(projectsRes.data);

        // Admin → fetch users
        if (currentUser?.role === "admin") {
          const usersRes = await api.get("/users");
          setUsers(usersRes.data);
        }

      } catch (err) {
        console.log("Fetch error:", err.response?.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // ================= CREATE =================

  const createProject = async () => {
    try {
      await api.post("/projects", {
        name: projectName,
        members: []
      });

      setProjectName("");

      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {
      alert("Error creating project");
    }
  };

  const createTask = async () => {
    try {
      await api.post("/tasks", {
        title,
        dueDate,
        assignedTo,
        projectId
      });

      setTitle("");
      setDueDate("");
      setAssignedTo("");
      setProjectId("");

      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Error creating task");
    }
  };

  // ================= UPDATE =================

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });

      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Not allowed or error updating");
    }
  };

  // ================= HELPERS =================

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "done"
    );
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(isOverdue).length;

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ================= UI =================

  return (
    <Layout>
      <div className="p-2">

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-2xl font-bold text-green-600">{completed}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Overdue</p>
            <h2 className="text-2xl font-bold text-red-500">{overdue}</h2>
          </div>
        </div>

        {/* ADMIN PANEL */}
        {currentUser?.role === "admin" && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* CREATE PROJECT */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Create Project</h2>

              <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={createProject}
              >
                Create
              </button>
            </div>

            {/* CREATE TASK */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Create Task</h2>

              <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-2 rounded"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <select
                className="border p-2 w-full mb-2 rounded"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Assign User</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 w-full mb-2 rounded"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                onClick={createTask}
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* TASK LIST */}
        <div className="grid md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div
              key={task._id}
              className={`p-4 rounded-xl shadow bg-white border ${
                isOverdue(task) ? "border-red-400" : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold text-lg">{task.title}</h3>

              <p className="text-sm text-gray-500">
                Status: {task.status}
              </p>

              <p className="text-sm">
                Due: {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No date"}
              </p>

              <p className="text-sm">
                Assigned: {task.assignedTo?.name || "None"}
              </p>

              <p className="text-sm mb-3">
                Project: {task.projectId?.name || "None"}
              </p>

              {(currentUser?.role === "admin" ||
                task.assignedTo?._id === currentUser?.id) && (
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded text-xs"
                    onClick={() => updateStatus(task._id, "todo")}
                  >
                    Todo
                  </button>

                  <button
                    className="px-2 py-1 bg-blue-200 rounded text-xs"
                    onClick={() => updateStatus(task._id, "in-progress")}
                  >
                    In Progress
                  </button>

                  <button
                    className="px-2 py-1 bg-green-200 rounded text-xs"
                    onClick={() => updateStatus(task._id, "done")}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}