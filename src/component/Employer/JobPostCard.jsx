import React from "react";

export default function JobPostCard({
  formData,
  handleChange,
  handleSubmit,
  isEdit
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="job-card">

      <h1 className="job-title">
        {isEdit ? "✏️ Edit Job" : "📌 Post New Job"}
      </h1>

      <form onSubmit={handleSubmit} className="job-form">

        <input
          name="job_type"
          placeholder="Job Type"
          value={formData.job_type}
          onChange={handleChange}
          required
        />

        <input
          name="business_type"
          placeholder="Business Type"
          value={formData.business_type}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <div className="job-row">
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            min={today}   // ✅ BLOCK PAST DATE
            required
          />

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            min={formData.start_date || today}  // ✅ MUST BE AFTER START
            required
          />
        </div>

        <input
          name="work_time"
          placeholder="Work Time (e.g 9AM - 5PM)"
          value={formData.work_time}
          onChange={handleChange}
          required
        />

        <input
          name="salary_estimate"
          placeholder="Salary (e.g RM100/day)"
          value={formData.salary_estimate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="num_workers"
          placeholder="Number of Workers"
          value={formData.num_workers}
          onChange={handleChange}
          required
        />

        <textarea
          name="criteria"
          placeholder="Job Criteria"
          value={formData.criteria}
          onChange={handleChange}
          required
        />

        <button type="submit" className="job-btn">
          {isEdit ? "Update Job" : "Post Job"}
        </button>

      </form>
    </div>
  );
}