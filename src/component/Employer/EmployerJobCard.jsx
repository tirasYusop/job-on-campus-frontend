import React from "react";

export default function EmployerJobCard({
  job,
  onClick,
  formatTime,
  isExpired,
}) {
  return (
    <div className="empD-card" onClick={onClick}>
      {/* BADGE */}
      {isExpired(job) ? (
        <div className="empD-badge" style={{ background: "#6b7280" }}>
          JOB EXPIRED
        </div>
      ) : job.total_applicants > 0 ? (
        <div className="empD-badge">
          {job.total_applicants}
        </div>
      ) : null}

      <h3>
        {job.job_type} • {job.location}
      </h3>

      <p>{formatTime(job.created_at)}</p>

      <p className="hint">Click to view applicants</p>
    </div>
  );
}