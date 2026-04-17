import JobCard from "./JobCard";

function EmployerJobsModal({ jobs, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box large" onClick={(e) => e.stopPropagation()}>

        <h2>📦 Employer Jobs</h2>

        {jobs.length === 0 ? (
          <p>No jobs posted yet</p>
        ) : (
          <div className="job-card-container">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default EmployerJobsModal;