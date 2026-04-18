import React from "react";

export default function JobApplicantsModal({
  selectedJob,
  setSelectedJob,
  setSelectedStudent,
  isExpired,
  handleEditJob,
  handleDeleteJob,
  updateApplication,
  setComplaintAppId,
}) {
  return (
    <div className="empD-modal" onClick={() => setSelectedJob(null)}>
      <div
        className="empD-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Applicants</h2>

        {/* ACTIONS */}
        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={() => handleEditJob(selectedJob)}
            disabled={isExpired(selectedJob)}
            style={{
              opacity: isExpired(selectedJob) ? 0.5 : 1,
              cursor: isExpired(selectedJob) ? "not-allowed" : "pointer",
              padding: "2px",
              marginTop: "6px",
            }}
          >
            Edit Job
          </button>

          <button
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              padding: "2px",
            }}
            onClick={() => handleDeleteJob(selectedJob.id)}
          >
            Delete Job
          </button>
        </div>

        {/* EMPTY STATE */}
        {(selectedJob?.applications || []).length === 0 ? (
          <p>No applicants yet</p>
        ) : (
          selectedJob.applications.map((app) => (
            <div
              key={app.id}
              className="empD-app-card"
              onClick={() => setSelectedStudent(app)}
              style={{ cursor: "pointer" }}
            >
              <p>👤 {app.student?.nama_penuh}</p>
              <p>Status: {app.status}</p>

              {/* COMPLAINT */}
              {app.complaint && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "8px",
                    background: "#ffe6e6",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  <b>Complaint:</b> {app.complaint}
                </div>
              )}

              {/* REPORT STATUS */}
              {app.complaint_status === "reported" && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  ⚠️ Report submitted
                </p>
              )}

              {/* REPORT BUTTON */}
              {app.status === "confirmed" && (
                <button
                  style={{
                    marginTop: "5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setComplaintAppId(app.id);
                  }}
                >
                  Report Student
                </button>
              )}

              {/* ACTION BUTTONS */}
              {app.status === "pending" ? (
                <div className="empD-actions">
                  <button
                    className="btn-accept"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateApplication(app.id, "confirm");
                    }}
                  >
                    Accept
                  </button>

                  <button
                    className="btn-reject"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateApplication(app.id, "reject");
                    }}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className={`status ${app.status}`}>
                  {app.status === "confirmed" ? "Accepted" : "Rejected"}
                </p>
              )}
            </div>
          ))
        )}

        <button
          className="close-btn"
          onClick={() => setSelectedJob(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}