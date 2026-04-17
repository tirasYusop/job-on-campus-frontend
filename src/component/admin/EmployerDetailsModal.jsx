function EmployerDetailsModal({ employer, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <h2>🏢 Employer Details</h2>

        <p><b>Company:</b> {employer.company_name}</p>
        <p><b>Username:</b> {employer.username}</p>
        <p><b>Full Name:</b> {employer.full_name}</p>
        <p><b>Phone:</b> {employer.phone_number}</p>
        <p>
          <b>Status:</b> {employer.verified ? "✅ Verified" : "❌ Unverified"}
        </p>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default EmployerDetailsModal;