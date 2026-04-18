import React from "react";
import "../css/AdminJobCard.css";

export default function JobCard({ job }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const isClosingSoon = () => {
    if (!job.end_date) return false;

    const today = new Date();
    const end = new Date(job.end_date);

    const diff = (end - today) / (1000 * 60 * 60 * 24);
    return diff <= 1 && diff >= 0; // within 24h
  };

  return (
    <div className="admin-job-card">

      {isClosingSoon() && (
        <div className="closing-badge">Closing Soon</div>
      )}

      <div className="job-header">
        <h3>{job.job_type}</h3>
        <span className="job-location">📍 {job.location}</span>
      </div>

      <div className="job-body">
        <p><b>Company:</b> {job.business_type}</p>
        <p><b>Phone:</b> {job.phone}</p>
        <p><b>Work Time:</b> {job.work_time}</p>
        <p><b>Salary:</b> {job.salary_estimate}</p>
        <p><b>Workers:</b> {job.num_workers}</p>
        <p><b>Criteria:</b> {job.criteria}</p>

        <div className="date-row">
          <span>Start: {formatDate(job.start_date)}</span>
          <span>End: {formatDate(job.end_date)}</span>
        </div>
      </div>
    </div>
  );
}