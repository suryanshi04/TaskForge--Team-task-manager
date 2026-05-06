import { useEffect, useState, useCallback } from "react";
import api from "../utils/axios";
import Layout from "../components/Layout";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  const currentUser = token ? jwtDecode(token) : null;

  // ✅ memoized function
  const fetchUsers = useCallback(() => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Error fetching users"));
  }, []);

  // ✅ fixed dependency
  useEffect(() => {
    if (currentUser?.role === "admin") {
      fetchUsers();
    }
  }, [currentUser, fetchUsers]);

  if (currentUser?.role !== "admin") {
    return <p className="p-6 text-red-500 font-semibold">Access Denied</p>;
  }

  const updateRole = async (id, role) => {
    try {
      await api.put(`/users/${id}/role`, { role });
      fetchUsers(); // refresh
    } catch {
      alert("Error updating role");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {users.map(u => (
          <div
            key={u._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs">
                Role: <span className="font-medium">{u.role}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => updateRole(u._id, "admin")}
              >
                Make Admin
              </button>

              <button
                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => updateRole(u._id, "member")}
              >
                Make Member
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}