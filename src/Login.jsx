import React, { useState } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; // 👈 Custom CSS for beauty

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsSuccess(null);

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("username", username);

      setMsg("Login Successful 🎉");
      setIsSuccess(true);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail || "Invalid credentials. Try again!";
      setMsg(errorMsg);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="login-page">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card glass-card p-4 shadow-lg rounded-4">
                <h2 className="text-center mb-4 text-primary fw-bold">🔐 Login to Your Account</h2>

                {msg && (
                  <div
                    className={`alert ${
                      isSuccess ? "alert-success" : "alert-danger"
                    } text-center fw-semibold`}
                  >
                    {msg}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">
                      👤 Username
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                      🔒 Password
                    </label>
                    <div className="input-group shadow-sm">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-gradient rounded-pill shadow">
                      🚀 Login Now
                    </button>
                  </div>

                  <p className="text-center text-muted mt-3">
                    Don't have an account?{" "}
                    <Link to="/registration" className="fw-semibold text-decoration-none">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
