import React from "react";
import "../css/NotificationPanel.css";

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
  setShowTnc
}) {
  return (
    <div className="notification-panel">

      <h3>DASHBOARD</h3>

      {/* ACCEPTED */}
      <div
        onClick={() => toggleSection("accepted")}
        className="title accepted"
      >
        🟢 Accepted
      </div>

      {openSection === "accepted" &&
        accepted.map(a => (
          <p
            key={a.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const job = jobs.find(j => j.id === a.job_id);
              if (job) setSelectedJob(job);
            }}
          >
            {a.job_type}
          </p>
        ))
      }

      {/* REJECTED */}
      <div
        onClick={() => toggleSection("rejected")}
        className="title rejected"
      >
        🔴 Rejected
      </div>

      {openSection === "rejected" &&
        rejected.map(a => (
          <p key={a.id}>🔴 {a.job_type}</p>
        ))
      }

      {/* PENDING */}
      <div
        onClick={() => toggleSection("pending")}
        className="title pending"
      >
        🟡 Pending
      </div>

      {openSection === "pending" &&
        pending.map(a => (
          <div key={a.id} className="pending-item">
            <span>{a.job_type}</span>

            <button
              className="cancel-mini-btn"
              onClick={() => setConfirmCancel(a.job_id)}
            >
              Cancel
            </button>
          </div>
        ))
      }

      {/* PAST JOBS */}
      <div
        onClick={() => toggleSection("past")}
        className="title"
      >
        📌 Past Jobs
      </div>

      {openSection === "past" &&
        (pastJobs.length === 0 ? (
          <p>No past jobs</p>
        ) : (
          pastJobs.map(a => (
            <div key={a.id} style={{ marginBottom: "8px" }}>
              <span>✔ {a.job_type}</span>

              <button
                style={{
                  marginLeft: "10px",
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
                onClick={() => setFeedbackAppId(a.id)}
              >
                Give Feedback
              </button>
            </div>
          ))
        ))
      }

      {/* TERMS */}
      <div
        onClick={() => setShowTnc(true)}
        className="title"
      >
        📜 Terms & Conditions
      </div>

    </div>
  );
}