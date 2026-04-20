import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EmployerDashboard.css";
import logo from "../images/LOGOMPP.png";
import api from "../api";
import EmployerResponsibilityPopup from "../component/EmployerResponsibilityPopup";
import EmployerJobCard from "../component/Employer/EmployerJobCard";
import JobApplicantsModal from "../component/Employer/JobApplicantsModal";
import StudentCard from "../component/admin/StudentCard";
import TermsAndConditions from "../component/TermsAndConditions"
import { FaPhone } from "react-icons/fa";

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [complaintText, setComplaintText] = useState("");
  const [complaintAppId, setComplaintAppId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ShowTnc,   setShowTnc,] = useState(false);
  const isExpired = (job) => {
  return new Date(job.end_date) < new Date();
};

  const fetchJobs = async () => {
    try {
      const res = await api.get("/employer-jobs/", {
        withCredentials: true,
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  useEffect(() => {
  const handlePopState = () => {
    window.location.reload();
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);

  useEffect(() => {
    fetchJobs();

    const interval = setInterval(() => {
      fetchJobs();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout/");

      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  const handlePostJob = () => {
    navigate("/employer/job-form");
  };

  const updateApplication = async (id, action) => {
    try {
      const res = await api.post(
        `/confirm-application/${id}/`,
        { action },
        { withCredentials: true }
      );

      await fetchJobs();

      setSelectedJob((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          applications: prev.applications.map((app) =>
            app.id === id ? { ...app, status: res.data.status } : app
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };
    const submitComplaint = async () => {
      if (!complaintAppId) {
        alert("No student selected to report");
        return;
      }

      if (!complaintText.trim()) {
        alert("Please write a complaint");
        return;
      }

      try {
          await api.post(
            `/employer/student-report/${complaintAppId}`,
            {
              complaint: complaintText.trim(),
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

        alert("Complaint submitted successfully!");

        // reset state
        setComplaintText("");
        setComplaintAppId(null);
      } catch (err) {
        console.error("Complaint error:", err.response?.data || err.message);
        alert(err.response?.data?.error || "Failed to submit complaint");
      }
    };

    const formatTime = (date) => {
    const diff = new Date() - new Date(date);

    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  // 🗑️ DELETE JOB
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(
        `/employer/job/delete-job/${jobId}/`,
        { withCredentials: true }
      );

      fetchJobs();
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT JOB
  const handleEditJob = (job) => {
    navigate(`/employer/job-form`, { state: job }); // pass job data
  };

return (
  <div className="empD-page">
    <EmployerResponsibilityPopup />

    <div className="empD-layout">
      <div className="sidebar">
        <div className="logo">
              <img src={logo} alt="Logo" />
        </div>
        <h3 className="sidebar-title">EMPLOYER PANEL</h3>

        <button onClick={() => navigate("/employer/EmployerProfile")} className ="sbutton">
          👤 Profile
        </button>

        <button onClick={() => setShowTnc(true)} className ="sbutton">
          📜 Terms & Conditions
        </button>

        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>

      <div className="empD-main">

        <div className="navbar">
          <div className="nav-left">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>

          <h2 className="nav-title">
            JOB ON CAMPUS UMS (EMPLOYER)
          </h2>

          <div className="nav-right">
            <div className="menu-wrapper">
              <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>

              {menuOpen && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/employer/EmployerProfile");
                      setMenuOpen(false);
                    }}
                  >
                    👤 Profile
                  </button>

                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowTnc(true);
                      setMenuOpen(false);
                    }}
                  >
                    📜 Terms & Conditions
                  </button>

                  <button
                    className="dropdown-item logout"
                    onClick={async () => {
                      await handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="empD-content">

        {/* 🔹 HERO */}
        <div className="empD-hero">
          <div>
            <p> "Manage your jobs and applicants"</p>
          </div>

          <button
            className="empD-post"
            onClick={handlePostJob}
          >
            ➕ Post Job
          </button>
        </div>

        {/* 🔹 JOB LIST */}
        <div className="empD-grid">
          {jobs.length === 0 ? (
            <p className="empty-text">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <EmployerJobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
                formatTime={formatTime}
                isExpired={isExpired}
              />
            ))
          )}
        </div>
        </div>

        {/* 🔹 MODALS */}
        {selectedJob && (
          <JobApplicantsModal
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            setSelectedStudent={setSelectedStudent}
            isExpired={isExpired}
            handleEditJob={handleEditJob}
            handleDeleteJob={handleDeleteJob}
            updateApplication={updateApplication}
            setComplaintAppId={setComplaintAppId}
          />
        )}

        {selectedStudent && (
          <StudentCard
            student={selectedStudent.student}
            onClose={() => setSelectedStudent(null)}
          />
        )}

        {complaintAppId && (
          <div
            className="empD-modal"
            onClick={() => setComplaintAppId(null)}
          >
            <div
              className="empD-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Report Student</h2>

              <textarea
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />

              <button onClick={submitComplaint}>Submit</button>
              <button onClick={() => setComplaintAppId(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* 🔹 TERMS */}
        {ShowTnc && (
          <TermsAndConditions onClose={() => setShowTnc(false)} />
        )}

        <button
        className="contact-btn"
        onClick={() =>
          window.open("https://wa.me/60142032341", "_blank")
        }
      >
        <FaPhone />
        <span>Contact us</span>
      </button>

      </div>
    </div>
  </div>
);
}