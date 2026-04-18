import { useEffect, useState } from "react";
import api from "../../api";
import "../css/Model.css";

function ComplaintCard({ student, onClose }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.get("/admin/complaint-list/")
      .then(res => {
        // filter only this student
        const filtered = res.data.filter(
          c => c.student_id === student.id || c.student === student.nama_penuh
        );

        setComplaints(filtered);
      })
      .catch(err => console.error(err));
  }, [student]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <h2>🚨 Complaints for {student.nama_penuh}</h2>

        {complaints.length === 0 ? (
          <p>No complaints</p>
        ) : (
          complaints.map((c) => (
            <div key={c.id} className="complaint-item">
              <p><b>From Job:</b> {c.job}</p>
              <p><b>Complaint:</b> {c.complaint}</p>
            </div>
          ))
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ComplaintCard;