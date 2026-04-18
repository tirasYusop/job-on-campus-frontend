import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/JobPost.css";
import api from "../api";
import JobPostCard from "../component/Employer/JobPostCard";

const emptyForm = {
  job_type: "",
  business_type: "",
  phone: "",
  location: "",
  start_date: "",
  end_date: "",
  work_time: "",
  salary_estimate: "",
  num_workers: "",
  criteria: "",
};

export default function JobPost() {
  const navigate = useNavigate();
  const location = useLocation();

  const editJob = location.state || null;
  const isEdit = !!editJob;

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        job_type: editJob.job_type || "",
        business_type: editJob.business_type || "",
        phone: editJob.phone || "",
        location: editJob.location || "",
        start_date: editJob.start_date || "",
        end_date: editJob.end_date || "",
        work_time: editJob.work_time || "",
        salary_estimate: editJob.salary_estimate || "",
        num_workers: editJob.num_workers || "",
        criteria: editJob.criteria || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [isEdit, editJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ EXTRA FRONTEND VALIDATION
    const today = new Date().toISOString().split("T")[0];

    if (formData.start_date < today) {
      return alert("Start date cannot be in the past");
    }

    if (formData.end_date < formData.start_date) {
      return alert("End date must be after start date");
    }

    try {
      if (isEdit) {
        await api.put(
          `/employer/job/update-job/${editJob.id}/`,
          formData,
          { withCredentials: true }
        );
        alert("Job updated successfully!");
      } else {
        await api.post(
          "/employer/post-job/",
          formData,
          { withCredentials: true }
        );
        alert("Job posted successfully!");
      }

      navigate("/employer-dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error saving job");
    }
  };

  return (
    <div className="job-page">

      <div className="admin-navbar">
        <div className="nav-left">
          <button onClick={() => navigate("/employer-dashboard")}>
            ← 
          </button>
        </div>

        <div className="nav-center">
          <h3>{isEdit ? "Edit Job" : "Post Job"}</h3>
        </div>
      </div>

      <div className="job-container">
        <JobPostCard
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
      </div>

    </div>
  );
}