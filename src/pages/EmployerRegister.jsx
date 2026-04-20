import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EmployerRegister.css";
import api from "../api";

function EmployerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    company_name: "",
    phone_number: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.username.trim()) return "Username is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.email.includes("@")) return "Invalid email format";
    if (!form.password.trim()) return "Password is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!form.full_name.trim()) return "Full name is required";
    if (!form.company_name.trim()) return "Company name is required";
    if (!form.phone_number.trim()) return "Phone number is required";
    if (!/^[0-9]{10,15}$/.test(form.phone_number))
      return "Phone number must be 10–15 digits";

    return null;
  };

  const handleRegister = async () => {
    const error = validate();
    if (error) return alert(error);

    try {
      const res = await api.post("/employer-register/", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        full_name: form.full_name.trim(),
        company_name: form.company_name.trim(),
        phone_number: form.phone_number.trim()
      });

      const data = res.data;

      // store tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // store user
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("showTermsPopup","false")

      alert("Employer registered successfully!");

      navigate("/employer-dashboard");

    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="emp-page">
      <div className="emp-card">

        <h2 className="emp-title">🏢 Employer Register</h2>
        <p className="emp-sub">Create your company account</p>

        <div className="emp-form">

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="emp-input"
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="emp-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="emp-input"
          />

          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="emp-input"
          />

          <input
            name="company_name"
            placeholder="Company Name"
            value={form.company_name}
            onChange={handleChange}
            className="emp-input"
          />

          <input
            type="number"
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            className="emp-input"
          />

        </div>

        <button className="emp-btn" onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  );
}

export default EmployerRegister;