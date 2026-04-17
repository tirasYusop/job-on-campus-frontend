import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import logo from "../images/LOGOMPP.png";
import api from "../api";
import TermsAndConditions from "../component/TermsAndConditions";
import NotificationPanel from "../component/Dashboard/NotificationPanel";
import JobCard from "../component/Dashboard/JobCard";

export default function StudentDashboard() {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

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

  const filteredJobs = jobs.filter(job => {
    const keyword = search.toLowerCase();

    return (
      job.job_type.toLowerCase().includes(keyword) ||
      job.business_type.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    );
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
  const now = new Date();

  const past = applications.filter(a => {
    if (a.status !== "confirmed") return false;

    // try find job end_date from jobs list
    const job = jobs.find(j => j.id === a.job_id);

    if (!job || !job.end_date) return false;

    return new Date(job.end_date) < now;
  });

  setPastJobs(past);
}, [applications, jobs]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(
          "/student-applications/",
          { withCredentials: true }
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  const applyJob = async (jobId) => {
    try {
      await api.post(
        `/apply-job/${jobId}/`,
        {},
        { withCredentials: true }
      );

      const res = await api.get(
        "/student-applications/",
        { withCredentials: true }
      );

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // CANCEL APPLICATION
  // =========================
  const cancelApplication = async (jobId) => {
    try {
      await api.delete(
        `/cancel-application/${jobId}/`,
        { withCredentials: true }
      );

      setApplications(prev =>
        prev.filter(app => Number(app.job_id) !== Number(jobId))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
      await api.post(
      "/logout/",
      {},
      { withCredentials: true }
    );

    localStorage.clear();
    navigate("/");
  };

    const submitFeedback = async () => {
    if (!feedbackText.trim()) return;

    try {
      await api.post(
        `/student/submit-feedback/${feedbackAppId}/`,
        { feedback: feedbackText },
        { withCredentials: true }
      );

      alert("Feedback submitted!");

      setFeedbackAppId(null);
      setFeedbackText("");

      // refresh
      const res = await api.get(
        "/student-applications/",
        { withCredentials: true }
      );
      setApplications(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FILTERS
  // =========================
  const accepted = applications.filter(a => a.status === "confirmed");
  const rejected = applications.filter(a => a.status === "rejected");
  const pending = applications.filter(a => a.status === "pending");

  const appliedJobsSet = new Set(
    applications
      .filter(a => a.status !== "cancelled")
      .map(a => Number(a.job_id))
  );

  return (
    <div className="dashboard-layout">
      <div className="navbar">
        <div className="nav-left">
          <button
            className="menu-btn"
            onClick={() => setShowSidebar(prev => !prev)}
          >
            ☰
          </button>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        <h3 className="nav-title">JOB ON CAMPUS UMS (STUDENT)</h3>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-body">
        <div className={`notification-wrapper ${showSidebar ? "open" : ""}`}>
          <NotificationPanel
            openSection={openSection}
            toggleSection={toggleSection}
            accepted={accepted}
            rejected={rejected}
            pending={pending}
            pastJobs={pastJobs}
            jobs={jobs}
            setSelectedJob={setSelectedJob}
            setConfirmCancel={setConfirmCancel}
            setFeedbackAppId={setFeedbackAppId}
            setShowTnc={setShowTnc}
            setShowSidebar={setShowSidebar}
          />
        </div>
        <div className="dashboard-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search job, company, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="container-joblist">

          {[...filteredJobs]
            .sort((a, b) => b.id - a.id)
            .map(job => {
              const isApplied = appliedJobsSet.has(Number(job.id));

              return (
                <JobCard
                  key={job.id}
                  job={job}
                  isApplied={isApplied}
                  onClick={() => setSelectedJob(job)}
                  onApplyClick={() => setConfirmJob(job)}
                />
              );
            })}
         </div>
        </div>
      </div>

      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
          style={{ touchAction: "none" }}
        />
      )}
      {showTnc && (
        <TermsAndConditions onClose={() => setShowTnc(false)} />
      )}

      {feedbackAppId && (
        <div className="modal-overlay" onClick={() => setFeedbackAppId(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>Give Feedback</h2>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback..."
              style={{ width: "100%", height: "120px" }}
            />

            <div className="modal-actions">
              <button className="confirm-btn" onClick={submitFeedback}>
                Submit
              </button>

              <button
                className="cancel-btn"
                onClick={() => setFeedbackAppId(null)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {confirmJob && (
        <div className="modal-overlay" onClick={() => setConfirmJob(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>⚠️ Confirm Apply</h2>
            <h3>{confirmJob.job_type}</h3>

            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => {
                  applyJob(confirmJob.id);
                  setConfirmJob(null);
                }}
              >
                Yes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setConfirmJob(null)}
              >
                No
              </button>
            </div>

          </div>
        </div>
      )}
      {confirmCancel && (
        <div className="modal-overlay" onClick={() => setConfirmCancel(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>Cancel Application?</h2>

            <div className="modal-actions">
              <button
                className="confirm-btn danger"
                onClick={() => {
                  cancelApplication(confirmCancel);
                  setConfirmCancel(null);
                }}
              >
                Yes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setConfirmCancel(null)}
              >
                No
              </button>
            </div>

          </div>
        </div>
      )}

      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>{selectedJob.job_type}</h2>

            <p><b>Company:</b> {selectedJob.business_type}</p>
            <p><b>Location:</b> {selectedJob.location}</p>
            <p><b>Phone:</b> {selectedJob.phone}</p>

            <p><b>Start Date:</b> {selectedJob.start_date}</p>
            <p><b>End Date:</b> {selectedJob.end_date}</p>

            <p><b>Work Time:</b> {selectedJob.work_time}</p>
            <p><b>Salary:</b> {selectedJob.salary_estimate}</p>
            <p><b>Workers:</b> {selectedJob.num_workers}</p>

            <p><b>Criteria:</b> {selectedJob.criteria}</p>


            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}