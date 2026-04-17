import { useEffect, useState } from "react";
import "../../css/AdminPages.css";
import api from "../../api";
import JobCard from "../../component/admin/JobCard";

function EmployersPage() {
  const [employers, setEmployers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [employerJobs, setEmployerJobs] = useState([]);
const [showJobsModal, setShowJobsModal] = useState(false);

  const [selectedEmployer, setSelectedEmployer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/employers/");
        setEmployers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (status === "ALL") {
      setFiltered(employers);
    } else if (status === "VERIFIED") {
      setFiltered(employers.filter(e => e.verified));
    } else {
      setFiltered(employers.filter(e => !e.verified));
    }
  }, [status, employers]);

  const fetchEmployerJobs = async (employerId) => {
  try {
    const res = await api.get(`/admin/employers/${employerId}/jobs/`);
    setEmployerJobs(res.data);
    setShowJobsModal(true);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="admin-page">

      <div className="admin-header">
        <h2>🏢 Employers Management</h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="ALL">All</option>
          <option value="VERIFIED">Verified</option>
          <option value="UNVERIFIED">Unverified</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Total Jobs</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr
                key={e.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedEmployer(e)}
              >
                <td>{e.company_name}</td>
                <td>{e.username}</td>
                <td>{e.phone_number}</td>
                <td>
                  {e.verified ? (
                    <span className="status verified">✅ Verified</span>
                  ) : (
                    <span className="status unverified">❌ Unverified</span>
                  )}
                </td>
                <td
                  style={{
                    color: "#3498db",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={(ev) => {
                    ev.stopPropagation(); // IMPORTANT
                    fetchEmployerJobs(e.id);
                  }}
                >
                  {e.total_jobs || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployer && (
        <div className="modal-overlay" onClick={() => setSelectedEmployer(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <h2>🏢 Employer Details</h2>

            <p><b>Company:</b> {selectedEmployer.company_name}</p>
            <p><b>Username:</b> {selectedEmployer.username}</p>
            <p><b>Full Name:</b> {selectedEmployer.full_name}</p>
            <p><b>Phone:</b> {selectedEmployer.phone_number}</p>
            <p>
              <b>Status:</b>{" "}
              {selectedEmployer.verified ? "✅ Verified" : "❌ Unverified"}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedEmployer(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

      {showJobsModal && (
        <div className="modal-overlay" onClick={() => setShowJobsModal(false)}>
          <div className="modal-box large" onClick={(e) => e.stopPropagation()}>

            <h2>📦 Employer Jobs</h2>

            {employerJobs.length === 0 ? (
              <p>No jobs posted</p>
            ) : (
              <div className="job-card-container">
                {employerJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            <button
              className="close-btn"
              onClick={() => setShowJobsModal(false)}
            >
              Close
            </button>

          </div>
        </div>
)}

      

    </div>
  );
}

export default EmployersPage;