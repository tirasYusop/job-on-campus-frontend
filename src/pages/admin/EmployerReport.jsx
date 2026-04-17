import { useEffect, useState } from "react";
import "../../css/AdminPages.css";
import api from "../../api";

import EmployerTable from "../../component/admin/EmployerTable";
import EmployerDetailsModal from "../../component/admin/EmployerDetailsModal";
import EmployerJobsModal from "../../component/admin/EmployerJobsModal";

function EmployersPage() {
  const [employers, setEmployers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState("ALL");

  const [selectedEmployer, setSelectedEmployer] = useState(null);

  const [employerJobs, setEmployerJobs] = useState([]);
  const [showJobsModal, setShowJobsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/admin/employers/");
      setEmployers(res.data);
      setFiltered(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "ALL") setFiltered(employers);
    else if (status === "VERIFIED")
      setFiltered(employers.filter(e => e.verified));
    else
      setFiltered(employers.filter(e => !e.verified));
  }, [status, employers]);

  const fetchEmployerJobs = async (employerId) => {
    const res = await api.get(`/admin/employers/${employerId}/jobs/`);
    setEmployerJobs(res.data);
    setShowJobsModal(true);
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

      {/* TABLE COMPONENT */}
      <EmployerTable
        employers={filtered}
        setSelectedEmployer={setSelectedEmployer}
        fetchEmployerJobs={fetchEmployerJobs}
      />

      {/* EMPLOYER DETAILS MODAL */}
      {selectedEmployer && (
        <EmployerDetailsModal
          employer={selectedEmployer}
          onClose={() => setSelectedEmployer(null)}
        />
      )}

      {/* JOBS MODAL */}
      {showJobsModal && (
        <EmployerJobsModal
          jobs={employerJobs}
          onClose={() => setShowJobsModal(false)}
        />
      )}

    </div>
  );
}

export default EmployersPage;