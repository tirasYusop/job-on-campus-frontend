function EmployerTable({ employers, setSelectedEmployer, fetchEmployerJobs }) {
  return (
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
          {employers.map((e) => (
            <tr key={e.id} onClick={() => setSelectedEmployer(e)}>
              <td>{e.company_name}</td>
              <td>{e.username}</td>
              <td>{e.phone_number}</td>

              <td>
                {e.verified ? "✅ Verified" : "❌ Unverified"}
              </td>

              <td
                style={{ color: "#3498db", cursor: "pointer" }}
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
  );
}

export default EmployerTable;