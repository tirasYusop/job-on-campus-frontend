import { useEffect, useState } from "react";
import "../../css/AdminPages.css";
import api from "../../api";
import AdminNavbar from "../../component/admin/AdminNavBar";
import StudentCard from "../../component/admin/StudentCard";
import ComplaintCard from "../../component/admin/ComplainCard";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [faculty, setFaculty] = useState("ALL");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedComplaintStudent, setSelectedComplaintStudent] = useState(null);

  const [report, setReport] = useState([]);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    api.get("/admin/students/")
      .then(res => {
        setStudents(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));

    api.get("/admin/student-accepted-report/")
      .then(res => {
        setReport(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // =========================
  // FILTER LOGIC
  // =========================
  useEffect(() => {
    if (faculty === "ALL") {
      setFiltered(students);
    } else {
      setFiltered(
        students.filter(s => s.fakulti === faculty)
      );
    }
  }, [faculty, students]);

  // =========================
  // MERGE REPORT DATA
  // =========================
  const mergedStudents = filtered.map(student => {
    const stats = report.find(r => r.student_id === student.id);

    return {
      ...student,
      total_applications: stats?.total_applications || 0,
      accepted_jobs: stats?.accepted_jobs || 0,
      rejected_jobs: stats?.rejected_jobs || 0,
      total_complaints: stats?.total_complaints || 0,
    };
  });

  // =========================
  // FACULTY LIST
  // =========================
  const faculties = ["ALL", ...new Set(students.map(s => s.fakulti))];

  return (
    <div className="admin-page">

      <AdminNavbar
        title="🎓 Students Management"
        backTo="/admin-dashboard"
      />
      <div className="contain-page">

      {/* FILTER */}
      <select
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
        className="filter-dropdown"
      >
        {faculties.map((f, i) => (
          <option key={i} value={f}>{f}</option>
        ))}
      </select>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric</th>
              <th>Faculty</th>
              <th>College</th>
              <th>Phone</th>

              <th>Applied</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Complaint</th>
            </tr>
          </thead>

          <tbody>
            {mergedStudents.map((s) => (
              <tr
                key={s.id}
                className="clickable-row"
                onClick={() => setSelectedStudent(s)}
              >
                <td>{s.nama_penuh}</td>
                <td>{s.no_matrik}</td>
                <td>{s.fakulti}</td>
                <td>{s.kolej}</td>
                <td>{s.no_telefon}</td>

                <td>{s.total_applications}</td>
                <td>{s.accepted_jobs}</td>
                <td>{s.rejected_jobs}</td>

                {/*  CLICK COMPLAINT COLUMN */}
                <td
                  style={{
                    cursor: "pointer",
                    color: s.total_complaints > 0 ? "red" : "#999",
                    fontWeight: "bold"
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent StudentCard opening
                    setSelectedComplaintStudent(s);
                  }}
                >
                  {s.total_complaints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <StudentCard
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      {selectedComplaintStudent && (
        <ComplaintCard
          student={selectedComplaintStudent}
          onClose={() => setSelectedComplaintStudent(null)}
        />
      )}
    </div>
    </div>
  );
}

export default StudentsPage;