import "../css/StudentCard.css";

function EmployerCard({ employer, onClose }) {
  return (
    <div className="student-overlay" onClick={onClose}>
      <div className="student-card" onClick={(e) => e.stopPropagation()}>

        <h2>🏢 Employer Details</h2>

        <div className="student-info">
          <p><b>Company:</b> {employer.company_name}</p>
          <p><b>Full Name:</b> {employer.full_name}</p>
          <p><b>Username:</b> {employer.username}</p>
          <p><b>Email:</b> {employer.email}</p> {/* ✅ NEW */}
          <p><b>Phone:</b> {employer.phone_number}</p>
          <p>
            <b>Status:</b>{" "}
            {employer.verified ? "✅ Verified" : "❌ Unverified"}
          </p>
          <p><b>Total Jobs:</b> {employer.total_jobs}</p>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default EmployerCard;