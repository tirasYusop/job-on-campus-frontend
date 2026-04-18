import "../css/StudentCard.css";

function StudentCard({ student, onClose }) {
  return (
    <div className="student-overlay" onClick={onClose}>
      <div className="student-card" onClick={(e) => e.stopPropagation()}>

        <h2>🎓 Student Details</h2>

        <div className="student-info">
          <p><b>Name:</b> {student.nama_penuh}</p>
          <p><b>Matric:</b> {student.no_matrik}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Phone:</b> {student.no_telefon}</p>
          <p><b>Faculty:</b> {student.fakulti}</p>
          <p><b>College:</b> {student.kolej}</p>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default StudentCard;