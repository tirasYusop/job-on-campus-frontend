import React, { useEffect, useState } from "react";
import api from "../api";
import "../css/Profile.css";
import AdminNavbar from "../component/admin/AdminNavBar";

export default function EmployerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    phone_number: "",
    email: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/employer/profile/");

      setProfile(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("PROFILE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await api.put("/employer/update-employer-profile/", form, {
        withCredentials: true
      });

      setEditMode(false);
      fetchProfile(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="profile-loading">Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="profile-page">
      <AdminNavbar title=" Employers Profile" backTo="/employer-dashboard" />
      <div className="profile-content">
      <div className="profile-card">

        <p><b>Username:</b> {profile.username}</p>

        <label>Full Name:</label>
        <input
          name="full_name"
          value={form.full_name || ""}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Company:</label>
        <input
          name="company_name"
          value={form.company_name || ""}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Email:</label>
        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Phone:</label>
        <input
          name="phone_number"
          value={form.phone_number || ""}
          onChange={handleChange}
          disabled={!editMode}
        />

        <p><b>Total Jobs:</b> {profile.total_jobs}</p>

        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit
          </button>
        ) : (
          <div className="btn-group">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={() => setEditMode(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}