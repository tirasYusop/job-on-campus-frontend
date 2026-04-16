import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AdminDashboard.css";
import api from "../api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [employers, setEmployers] = useState([]);
  const [stats, setStats] = useState(null);

  // AUTH
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  // LOGOUT
  const handleLogout = async () => {
    await api.post("/logout/");

    localStorage.removeItem("role");
    navigate("/");
  };

  // FETCH UNVERIFIED
  const fetchEmployers = async () => {
    const res = await api.get("/admin/employers/unverified/");
    setEmployers(res.data);
  };

  // FETCH STATS
  const fetchStats = async () => {
    const res = await api.get("/admin/full-report/");
    setStats(res.data);
  };

  useEffect(() => {
    fetchEmployers();
    fetchStats();
  }, []);

  const verifyEmployer = async (id) => {
    await api.post(`/admin/verify-employer/${id}/`);

    alert("Employer verified!");
    fetchEmployers();
    fetchStats();
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
            Logout 🚪
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

          <div className="kpi-card danger">
            <h3>{employers.length}</h3>
            <p>Pending Verification</p>
          </div>

        </div>

        <div className="quick-actions">

          <div className="action-card" onClick={() => navigate("/admin/student-report")}>
            👤 Manage Users
          </div>

          <div className="action-card" onClick={() => navigate("/admin/full-report")}>
            📊 View Analytics
          </div>

          <div className="action-card" onClick={() => navigate("/admin/employer-report")}>
            🏢 Manage Employers
          </div>

        </div>

        <h2 className="section-title">⛔ Pending Employers</h2>

        <div className="grid">

          {employers.length === 0 ? (
            <p className="empty">No pending employers 🎉</p>
          ) : (
            employers.slice(0, 4).map((emp) => (
              <div key={emp.id} className="emp-card">
                <h3>{emp.company_name}</h3>
                <p>👤 {emp.username}</p>
                <p>📞 {emp.phone_number}</p>

                <button
                  className="verify-btn"
                  onClick={() => verifyEmployer(emp.id)}
                >
                  ✅ Verify
                </button>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;