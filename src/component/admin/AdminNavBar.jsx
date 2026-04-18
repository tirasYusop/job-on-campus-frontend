import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminNavBar.css";

function AdminNavbar({ title, backTo = "/admin-dashboard" }) {
  const navigate = useNavigate();

  return (
    <div className="admin-navbar">
      <button
        className="admin-back-btn"
        onClick={() => navigate(backTo)}
      >
        ← 
      </button>

      <h2 className="admin-title">{title}</h2>
    </div>
  );
}

export default AdminNavbar;