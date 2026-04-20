import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AdminDashboard.css";
import api from "../../api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // AUTH CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  // FETCH STATS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/full-report/");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await api.post("/logout/");
      localStorage.removeItem("role");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">

      {/* NAVBAR */}
      <div className="admin-navbar">
        <div className="nav-left">
          🛡️ <span>Admin Panel</span>
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="admin-content">

        <div className="kpi-grid">

          <div className="kpi-card">
            <h3>{stats?.total_users || 0}</h3>
            <p>Total Users</p>
          </div>

          <div className="kpi-card">
            <h3>{stats?.total_students || 0}</h3>
            <p>Students</p>
          </div>

          <div className="kpi-card">
            <h3>{stats?.total_employers || 0}</h3>
            <p>Employers</p>
          </div>

        </div>

        <div className="quick-actions">

          <div className="action-card" onClick={() => navigate("/admin/student-report")}>
            👤 Manage Students
          </div>

          <div className="action-card" onClick={() => navigate("/admin/full-report")}>
            📊 View Analytics
          </div>

          <div className="action-card" onClick={() => navigate("/admin/employer-report")}>
            🏢 Manage Employers
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;