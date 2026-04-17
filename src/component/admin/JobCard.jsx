function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.job_type}</h3>

      <p><b>Company:</b> {job.business_type}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary:</b> {job.salary_estimate}</p>
      <p><b>Workers:</b> {job.num_workers}</p>
      <p>
        <b>Date:</b> {job.start_date} → {job.end_date}
      </p>
    </div>
  );
}

export default JobCard;