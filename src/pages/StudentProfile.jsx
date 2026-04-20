import React, { useEffect, useState } from "react";
import api from "../api";
import "../css/Profile.css";
import AdminNavbar from "../component/admin/AdminNavBar";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    nama_penuh: "",
    no_matrik: "",
    no_telefon: "",
    fakulti: "",
    kolej: "",
    email: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/student/student-profile");

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
      await api.put("/student/update-student-profile", form, {
        withCredentials: true
      });

      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="profile-loading">Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="profile-page">

      <AdminNavbar title=" Student Profile" backTo="/student-dashboard" />

      <div className="profile-content">
        <div className="profile-card">

          <p><b>Username:</b> {profile.username}</p>

          <label>Full Name:</label>
          <input
            name="nama_penuh"
            value={form.nama_penuh || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>Matric No:</label>
          <input
            name="no_matrik"
            value={form.no_matrik || ""}
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
            name="no_telefon"
            value={form.no_telefon || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>Faculty:</label>
          <input
            name="fakulti"
            value={form.fakulti || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <label>College:</label>
          <input
            name="kolej"
            value={form.kolej || ""}
            onChange={handleChange}
            disabled={!editMode}
          />

          <p><b>Total Applications:</b> {profile.total_applications || 0}</p>

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