import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Registeration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India code
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  
  // Phone validation error ke liye
  const [phoneError, setPhoneError] = useState("");
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Country codes ki list
  const countryCodes = [
    { code: "+91", country: "India 🇮🇳" },
    { code: "+1", country: "USA/Canada 🇺🇸" },
    { code: "+44", country: "UK 🇬🇧" },
    { code: "+61", country: "Australia 🇦🇺" },
    { code: "+86", country: "China 🇨🇳" },
    { code: "+81", country: "Japan 🇯🇵" },
    { code: "+49", country: "Germany 🇩🇪" },
    { code: "+33", country: "France 🇫🇷" },
    { code: "+971", country: "UAE 🇦🇪" },
    { code: "+966", country: "Saudi Arabia 🇸🇦" },
    { code: "+92", country: "Pakistan 🇵🇰" },
    { code: "+94", country: "Sri Lanka 🇱🇰" },
    { code: "+880", country: "Bangladesh 🇧🇩" },
    { code: "+977", country: "Nepal 🇳🇵" },
    { code: "+975", country: "Bhutan 🇧🇹" },
  ];

  // Phone number validate karne ka function
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Phone number change handler
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Sirf digits allow karo
    const digitsOnly = value.replace(/\D/g, "");
    
    // 10 digits se zyada na ho
    if (digitsOnly.length <= 10) {
      setPhone(digitsOnly);
      
      // Validation error check karo
      if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsSuccess(null);

    // Phone number validation
    if (!validatePhoneNumber(phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    // Complete phone number with country code
    const completePhoneNumber = `${countryCode}${phone}`;

    try {
      const response = await axios.post("https://nthealthcarebackend.onrender.com/api/register/", {
        username: username,
        email: email,
        phone: completePhoneNumber, // Complete phone number with country code
        password: password,
        password2: password2,
      });

      setMsg(response.data.message || "Registration Successful");
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 1300);
    } catch (err) {
      const error = err.response?.data?.error;
      const message =
        typeof error === "object"
          ? Object.values(error).flat().join(" ")
          : error || "Registration Failed";

      setMsg(message);
      setIsSuccess(false);
    }
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
          .register-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 20px;
          }
          .blob {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            filter: blur(40px);
            opacity: 0.4;
            z-index: 0;
            animation: float 10s infinite ease-in-out;
          }
          .blob-1 { top: -10%; left: -10%; background: rgba(255, 255, 255, 0.3); animation-delay: 0s; }
          .blob-2 { bottom: -10%; right: -10%; background: rgba(102, 126, 234, 0.4); animation-delay: 2s; }
          .blob-3 { top: 40%; left: 60%; background: rgba(118, 75, 162, 0.3); animation-delay: 4s; }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .register-card {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.5);
            animation: slideUp 0.6s ease-out forwards;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .form-control-custom {
            border: 2px solid #e9ecef;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
          }
          .form-control-custom:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
            outline: none;
          }
          .btn-gradient {
            background: linear-gradient(to right, #667eea, #764ba2);
            border: none;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
            color: white;
          }
          .input-group-text {
            background: transparent;
            border: 2px solid #e9ecef;
            color: #764ba2;
          }
          .input-group-text.left-icon {
            border-right: 0;
            border-radius: 50px 0 0 50px;
          }
          .input-group .form-control-custom {
            border-left: 0;
            border-radius: 0 50px 50px 0;
          }
          .password-field .form-control-custom {
            border-radius: 0;
            border-left: 0;
            border-right: 0;
          }
          .toggle-password {
            background: transparent;
            border: 2px solid #e9ecef;
            border-left: 0;
            border-radius: 0 50px 50px 0;
            color: #764ba2;
            cursor: pointer;
            transition: all 0.2s;
          }
          .toggle-password:hover {
            color: #667eea;
          }
          .country-code-select {
            border: 2px solid #e9ecef;
            border-right: 0;
            border-radius: 50px 0 0 50px;
            background: transparent;
            color: #764ba2;
            font-weight: 500;
            padding: 0.75rem 0.5rem;
            cursor: pointer;
          }
          .country-code-select:focus {
            outline: none;
            border-color: #667eea;
          }
          .phone-input {
            border-left: 0;
            border-radius: 0 50px 50px 0;
          }
          .invalid-feedback {
            display: block;
            margin-top: 0.25rem;
            font-size: 0.875rem;
            color: #dc3545;
          }
        `}
      </style>

      <Nav />
      
      <div className="register-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        <div className="register-card p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: '2.5rem' }}>🚀</div>
            <h2 className="fw-bold text-dark mt-2">Create Account</h2>
            <p className="text-muted small">Join us and start your journey</p>
          </div>

          {msg && (
            <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} text-center rounded-pill py-2`} role="alert">
              <i className={`fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold ps-2">USERNAME</label>
              <div className="input-group">
                <span className="input-group-text left-icon"><i className="fas fa-user"></i></span>
                <input 
                  type="text" 
                  className="form-control form-control-custom" 
                  placeholder="Enter Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold ps-2">EMAIL</label>
              <div className="input-group">
                <span className="input-group-text left-icon"><i className="fas fa-envelope"></i></span>
                <input 
                  type="email" 
                  className="form-control form-control-custom" 
                  placeholder="Enter Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Phone Number with Country Code */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold ps-2">PHONE NUMBER</label>
              <div className="input-group">
                <span className="input-group-text left-icon"><i className="fas fa-phone"></i></span>
                
                {/* Country Code Dropdown */}
                <select 
                  className="form-control country-code-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{ maxWidth: '100px' }}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>

                {/* Phone Input */}
                <input 
                  type="tel" 
                  className={`form-control form-control-custom phone-input ${phoneError ? 'is-invalid' : ''}`}
                  placeholder="Enter 10 digits" 
                  value={phone} 
                  onChange={handlePhoneChange}
                  maxLength="10"
                  required 
                />
              </div>
              
              {/* Phone Number Display with Country Code */}
              {phone && phone.length === 10 && (
                <small className="text-success d-block mt-1">
                  <i className="fas fa-check-circle me-1"></i>
                  Complete number: {countryCode} {phone}
                </small>
              )}
              
              {/* Phone Error Message */}
              {phoneError && (
                <div className="invalid-feedback">
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {phoneError}
                </div>
              )}
              
              <small className="text-muted d-block mt-1">
                Enter exactly 10 digits (without country code)
              </small>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold ps-2">PASSWORD</label>
              <div className="input-group password-field">
                <span className="input-group-text left-icon"><i className="fas fa-lock"></i></span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control form-control-custom" 
                  placeholder="Enter Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <span className="input-group-text toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold ps-2">CONFIRM PASSWORD</label>
              <div className="input-group password-field">
                <span className="input-group-text left-icon"><i className="fas fa-shield-alt"></i></span>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="form-control form-control-custom" 
                  placeholder="Confirm Password" 
                  value={password2} 
                  onChange={(e) => setPassword2(e.target.value)} 
                  required 
                />
                <span className="input-group-text toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-gradient btn-lg"
                disabled={phoneError || (phone.length > 0 && phone.length !== 10)}
              >
                Submit Now <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Already have an account?{" "}
                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#764ba2' }}>
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registeration;