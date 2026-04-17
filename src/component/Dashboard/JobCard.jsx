import React from "react";
import "../css/JobCard.css";

export default function JobCard({
  job,
  isApplied,
  onClick,
  onApplyClick
}) {

  // ✅ moved inside component (Option B)
  const timeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diff = Math.floor((now - posted) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="jobList-card" onClick={onClick}>

      <div className="job-header">
        <div>
          <h3>{job.job_type}</h3>
          <p className="company">{job.business_type}</p>
        </div>

        <div className="job-time">
          🕒 {timeAgo(job.created_at)}
        </div>
      </div>

      <p>📍 LOCATION {job.location}</p>
      <p>DATE: {job.start_date} SEHINGGA {job.end_date}</p>
      <p>🕒 TIME: {job.work_time}</p>
      <p>SALARY: {job.salary_estimate}</p>
      <p>WORKER: {job.num_workers}</p>
      <p>CRITERIA: {job.criteria}</p>

      <button
        className={`apply-btn ${isApplied ? "disabled" : ""}`}
        disabled={isApplied}
        onClick={(e) => {
          e.stopPropagation();
          onApplyClick();
        }}
      >
        {isApplied ? "Applied" : "Apply Job"}
      </button>

    </div>
  );
}