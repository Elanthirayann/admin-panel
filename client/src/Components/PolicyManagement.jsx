import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PolicyManagement.css";

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/policies");
      setPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleAddPolicy = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/policies", {
        title,
        content,
      });
      setPolicies([...policies, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding policy:", error);
    }
  };

  const handleEditPolicy = (policy) => {
    setTitle(policy.title);
    setContent(policy.content);
    setEditingPolicy(policy.id);
  };

  const handleUpdatePolicy = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/policies/${editingPolicy}`,
        { title, content }
      );
      setPolicies(
        policies.map((policy) =>
          policy.id === editingPolicy ? response.data : policy
        )
      );
      setTitle("");
      setContent("");
      setEditingPolicy(null);
    } catch (error) {
      console.error("Error updating policy:", error);
    }
  };

  const handleDeletePolicy = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/policies/${id}`);
      setPolicies(policies.filter((policy) => policy.id !== id));
      setAlertMessage("Deleted successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="policy-management">
      <h1>Policy Management</h1>
      <div className="form">
        <input
          type="text"
          value={title}
          placeholder="Policy Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          placeholder="Policy Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {editingPolicy ? (
          <button className="update-button" onClick={handleUpdatePolicy}>
            Update Policy
          </button>
        ) : (
          <button className="add-button" onClick={handleAddPolicy}>
            Add Policy
          </button>
        )}
      </div>
      <div className="policy-list">
        <h2>Existing Policies</h2>
        <ul>
          {policies.map((policy) => (
            <li key={policy.id} className="policy-item">
              <h3>{policy.title}</h3>
              <p>{policy.content}</p>
              <div className="policy-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditPolicy(policy)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePolicy(policy.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAlert && (
        <div className="alert-modal">
          <div className="alert-content">
            <span className="alert-message">{alertMessage}</span>
            <button className="alert-close" onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManagement;
