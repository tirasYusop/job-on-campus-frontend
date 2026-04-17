import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import logo from "../images/LOGOMPP.png";
import api from "../api";
import TermsAndConditions from "../component/TermsAndConditions";
import NotificationPanel from "../component/Dashboard/NotificationPanel";

export default function StudentDashboard() {
  const [openSection, setOpenSection] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [confirmJob, setConfirmJob] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [search, setSearch] = useState("");
  const [feedbackAppId, setFeedbackAppId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [pastJobs, setPastJobs] = useState([]);
  const [showTnc, setShowTnc] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // JOB FILTER
  const filteredJobs = jobs.filter((job) => {
    const keyword = search.toLowerCase();
    return (
      job.job_type.toLowerCase().includes(keyword) ||
      job.business_type.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    );
  });

  // FETCH JOBS
  useEffect(() => {
    api.get("/jobs/")
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, []);

  // FETCH APPLICATIONS
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/student-applications/", {
          withCredentials: true,
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  // PAST JOBS
  useEffect(() => {
    const now = new Date();

    const past = applications.filter((a) => {
      if (a.status !== "confirmed") return false;
      const job = jobs.find((j) => j.id === a.job_id);
      if (!job || !job.end_date) return false;
      return new Date(job.end_date) < now;
    });

    setPastJobs(past);
  }, [applications, jobs]);

  const appliedJobsSet = new Set(
    applications.filter((a) => a.status !== "cancelled").map((a) => a.job_id)
  );

  const handleLogout = async () => {
    await api.post("/logout/", {}, { withCredentials: true });
    localStorage.clear();
    navigate("/");
  };

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="dashboard-layout">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>
            ☰
          </button>
          <img src={logo} className="logo" />
        </div>

        <h3 className="nav-title">JOB ON CAMPUS UMS</h3>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* BODY */}
      <div className="dashboard-body">

        {/* LEFT */}
        <div className="dashboard-content">

          <div className="search-bar">
            <input
              placeholder="Search job..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredJobs.map((job) => {
            const isApplied = appliedJobsSet.has(job.id);

            return (
              <div
                key={job.id}
                className="jobList-card"
                onClick={() => setSelectedJob(job)}
              >
                <div className="job-header">
                  <div>
                    <h3>{job.job_type}</h3>
                    <p className="company">{job.business_type}</p>
                  </div>
                  <span className="job-time">{timeAgo(job.created_at)}</span>
                </div>

                <p>📍 {job.location}</p>
                <p>💰 {job.salary_estimate}</p>

                <button
                  disabled={isApplied}
                  className="apply-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmJob(job);
                  }}
                >
                  {isApplied ? "Applied" : "Apply"}
                </button>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDEBAR (REUSABLE COMPONENT) */}
        <div className={`notification-wrapper ${showSidebar ? "open" : ""}`}>
          <NotificationPanel
            openSection={openSection}
            toggleSection={toggleSection}
            accepted={applications.filter(a => a.status === "confirmed")}
            rejected={applications.filter(a => a.status === "rejected")}
            pending={applications.filter(a => a.status === "pending")}
            pastJobs={pastJobs}
            jobs={jobs}
            setSelectedJob={setSelectedJob}
            setConfirmCancel={setConfirmCancel}
            setFeedbackAppId={setFeedbackAppId}
            setShowTnc={setShowTnc}
          />
        </div>

        {/* MOBILE OVERLAY */}
        {showSidebar && (
          <div
            className="sidebar-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}

      </div>

      {/* MODALS */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedJob.job_type}</h2>
            <p>{selectedJob.location}</p>
            <button onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}