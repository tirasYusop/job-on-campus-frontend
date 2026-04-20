import { useEffect, useState } from "react";
import "../../css/AdminPages.css";
import api from "../../api";
import JobCard from "../../component/admin/JobCard";
import AdminNavbar from "../../component/admin/AdminNavBar";
import EmployerCard from "../../component/admin/EmployerCard";

function EmployersPage() {
  const [employers, setEmployers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [showJobsModal, setShowJobsModal] = useState(false);
  const [search, setSearch] = useState("");

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
    const delay = setTimeout(() => {
      const keyword = search.toLowerCase();

      const result = employers.filter((e) =>
        e.full_name?.toLowerCase().includes(keyword) ||
        e.company_name?.toLowerCase().includes(keyword) ||
        e.email?.toLowerCase().includes(keyword)
      );

      setFiltered(result);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, employers]);

  const fetchEmployerDetails = async (id) => {
  try {
    const res = await api.get("/admin/employers/");
    const emp = res.data.find(e => e.id === id);
    setSelectedEmployer(emp);
  } catch (err) {
    console.error(err);
  }
};

  const fetchEmployerJobs = async (employerId) => {
    try {
      const res = await api.get("/jobs/");

      const filteredJobs = res.data.filter(
        job => job.employer_id === employerId
      );

      setEmployerJobs(filteredJobs);
      setShowJobsModal(true);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <AdminNavbar title="🏢 Employers Management" backTo="/admin-dashboard" />
      <div className="contain-page">

      {/* FILTER */}
      <input
        type="text"
        placeholder="Search employer "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Total Jobs</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr
                key={e.id}
                onClick={() => fetchEmployerDetails(e.id)}
                className="clickable-row"
              >
                <td>{e.company_name}</td>
                <td>{e.username}</td>
                <td>{e.phone_number}</td>

                <td
                  style={{ color: "#3498db", fontWeight: "bold", cursor: "pointer" }}
                  onClick={(ev) => {
                    ev.stopPropagation(); 
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
        <EmployerCard
          employer={selectedEmployer}
          onClose={() => setSelectedEmployer(null)}
        />
      )}
      {showJobsModal && (
        <div className="modal-overlayAdmin" onClick={() => setShowJobsModal(false)}>
          <div className="modal-box large" onClick={(e) => e.stopPropagation()}>

            <h2>Jobs Posted</h2>

            <div className="modal-content-scroll">
              {employerJobs.length === 0 ? (
                <p>No jobs found</p>
              ) : (
                employerJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>

            <button className="close-btn" onClick={() => setShowJobsModal(false)}>
              Close
            </button>

          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default EmployersPage;