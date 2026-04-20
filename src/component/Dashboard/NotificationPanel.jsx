import React from "react";
import "../css/NotificationPanel.css";
import logo from "../../images/LOGOMPP.png";

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
  setShowSidebar,
  handleLogout, 
  setOpenProfile 
}) {
  return (
    <div className="notification-panel">

      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* HEADER */}
      <div className="np-header">
        <h4>STUDENT PANEL</h4>
      </div>

      <div className="np-content">

        {/* ACCEPTED */}
        <div onClick={() => toggleSection("accepted")} className="title accepted">
          🟢 Accepted
        </div>

        {openSection === "accepted" &&
          accepted.map((a) => (
            <p
              key={a.id}
              onClick={() => {
                const job = jobs.find((j) => j.id === a.job_id);
                if (job) setSelectedJob(job);
                setShowSidebar(false);
              }}
            >
              🟢 {a.job_type}
            </p>
          ))}

        {/* REJECTED */}
        <div onClick={() => toggleSection("rejected")} className="title rejected">
          🔴 Rejected
        </div>

        {openSection === "rejected" &&
          rejected.map((a) => (
            <p key={a.id}>🔴 {a.job_type}</p>
          ))}

        {/* PENDING */}
        <div onClick={() => toggleSection("pending")} className="title pending">
          🟡 Pending
        </div>

        {openSection === "pending" &&
          pending.map((a) => (
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
          ))}

        {/* PAST */}
        <div onClick={() => toggleSection("past")} className="title">
          📌 Past Jobs
        </div>

        {openSection === "past" &&
          (pastJobs.length === 0 ? (
            <p>No past jobs</p>
          ) : (
            pastJobs.map((a) => (
              <div key={a.id}>
                <span>✔ {a.job_type}</span>
                <button
                  onClick={() => {
                    setFeedbackAppId(a.id);
                    setShowSidebar(false);
                  }}
                >
                  Feedback
                </button>
              </div>
            ))
          ))}

        {/* TERMS */}
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

      {/* FOOTER (LOGOUT FIXED BOTTOM) */}
      <div className="np-footer">
        <div
          className="title profile"
          onClick={() => {
            setSelectedJob(null); // optional reset
            setShowSidebar(false);
            setOpenProfile(true); // 👈 ADD THIS STATE
          }}
        >
          👤 My Profile
        </div>
        <button className="logout-btnNoti" onClick={handleLogout}>
           Logout
        </button>
      </div>

    </div>
  );
}