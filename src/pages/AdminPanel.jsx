import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ""
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin-login");

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin-panel/users", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/admin-panel/users/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Updated successfully");
      } else {
        await API.post(`/admin-panel/users`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Added successfully");
      }

      setForm({ name: "", email: "", role: "" });
      setEditId(null);
      fetchUsers();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin-panel/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        />

        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <button onClick={() => {
                  setEditId(u._id);
                  setForm({ name: u.name, email: u.email, role: u.role });
                }}>
                  Edit
                </button>

                <button onClick={() => handleDelete(u._id)} style={{ background: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
