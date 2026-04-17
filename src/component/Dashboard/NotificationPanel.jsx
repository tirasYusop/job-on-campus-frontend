import React from "react";
import "../CSS/NotificationPanel.css";

export default function NotificationPanel({
  openSection,
  toggleSection,
  accepted,
  rejected,
  pending,
  pastJobs,
  jobs,
  setSelectedJob,
  setConfirmCancel,
  setFeedbackAppId,
  setShowTnc,
  setShowSidebar
}) {
  return (
    <div className="notification-panel">

      <h3>DASHBOARD</h3>

      <div onClick={() => toggleSection("accepted")} className="title accepted">
        🟢 Accepted
      </div>

      {openSection === "accepted" &&
        accepted.map(a => (
          <p
            key={a.id}
            onClick={() => {
              const job = jobs.find(j => j.id === a.job_id);
              if (job) setSelectedJob(job);
              setShowSidebar(false);
            }}
          >
            {a.job_type}
          </p>
        ))
      }

      <div onClick={() => toggleSection("rejected")} className="title rejected">
        🔴 Rejected
      </div>

      {openSection === "rejected" &&
        rejected.map(a => (
          <p key={a.id}>🔴 {a.job_type}</p>
        ))
      }

      <div onClick={() => toggleSection("pending")} className="title pending">
        🟡 Pending
      </div>

      {openSection === "pending" &&
        pending.map(a => (
          <div key={a.id} className="pending-item">
            <span>{a.job_type}</span>
            <button
              className="cancel-mini-btn"
              onClick={() => {
                setConfirmCancel(a.job_id);
                setShowSidebar(false);
              }}
            >
              Cancel
            </button>
          </div>
        ))
      }

      <div onClick={() => toggleSection("past")} className="title">
        📌 Past Jobs
      </div>

      {openSection === "past" &&
        (pastJobs.length === 0 ? (
          <p>No past jobs</p>
        ) : (
          pastJobs.map(a => (
            <div key={a.id}>
              <span>✔ {a.job_type}</span>
              <button
                onClick={() => {
                  setFeedbackAppId(a.id);
                  setShowSidebar(false);
                }}
              >
                Give Feedback
              </button>
            </div>
          ))
        ))
      }

      <div
        onClick={() => {
          setShowTnc(true);
          setShowSidebar(false);
        }}
        className="title"
      >
        📜 Terms & Conditions
      </div>

    </div>
  );
}