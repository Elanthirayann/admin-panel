import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaUser,
  FaCar,
  FaChartBar,
  FaExclamationCircle,
  FaGavel,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls sidebar's visibility
  const navigate = useNavigate(); // Initialize navigate function

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "❌" : "☰"}
      </button>
      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaTachometerAlt className="icon" />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaUser className="icon" />
          {isOpen && <span>User Management</span>}
        </NavLink>
        <NavLink
          to="/ride-monitoring"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaCar className="icon" />
          {isOpen && <span>Ride Monitoring</span>}
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaChartBar className="icon" />
          {isOpen && <span>Reports</span>}
        </NavLink>
        <NavLink
          to="/issue-management"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaExclamationCircle className="icon" />
          {isOpen && <span>Issue Management</span>}
        </NavLink>
        <NavLink
          to="/policy-management"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <FaGavel className="icon" />
          {isOpen && <span>Policy Management</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
