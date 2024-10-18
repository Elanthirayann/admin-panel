import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import "./User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    gender: "",
    password: "", // Add password field
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId
      ? `http://localhost:5000/api/users/${editingId}`
      : "http://localhost:5000/api/users";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error saving user");
      }
      setFormData({
        username: "",
        email: "",
        phonenumber: "",
        gender: "",
        password: "",
      });
      setEditingId(null);
      setShowModal(false); // Close the modal on successful submit
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      gender: user.gender,
      password: "", // Password should not be pre-filled
    });
    setEditingId(user.id);
    setShowModal(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <button className="add-user-btn" onClick={() => setShowModal(true)}>
        <span className="icon">
          <FaUserPlus />
        </span>
        ADD USER
      </button>

      {/* Modal for Adding/Editing User */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingId ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={(e) =>
                  setFormData({ ...formData, phonenumber: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <select
                placeholder="Gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button type="submit">
                {editingId ? "Update User" : "Add User"}
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.gender}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
