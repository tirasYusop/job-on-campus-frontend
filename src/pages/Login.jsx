import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import api from "../api";
import TermsPopup from "../component/TermsPopup";


function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await api.post("/token/", {
      username: loginId,
      password: password,
    });

    const data = res.data;

    // SAVE JWT TOKENS
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // OPTIONAL: decode role later from backend or separate endpoint
    localStorage.setItem("role", "student"); // temporary if needed

    // redirect
    navigate("/student-dashboard");

  } catch (err) {
    alert(err.response?.data?.detail || "Login failed");
  }
};

  return (
    <div className="login-page">

      <TermsPopup />

      {/* WRAPPER */}
      <div className="login-container">

        <div className="welcome-box">
          <h1>🎓 Welcome to</h1>
          <h2>Job On Campus UMS</h2>

          <p>
            Connect with employers, explore opportunities, and manage your
            campus career in one place.
          </p>

            <div className="welcome-extra">
            <ul>
                <li>✔ Find jobs easily</li>
                <li>✔ Apply in seconds</li>
                <li>✔ Track applications</li>
              </ul>

              <div className="quote">
                “Your future starts here.”
              </div>
            </div>
        </div>


               {/* YOUR EXISTING CARD (UNCHANGED) */}
        <div className="login-card animate-card">

          <h2 className="login-title">🔐 Login</h2>
          <p className="login-sub">Welcome to Job Campus, Please Sign In.</p>

          <div className="login-form">

            <input
              className="login-input"
              placeholder="Student ID / Username / Email"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <button
            className="login-register-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

 
      </div>
    </div>
  );
  }

export default Login;