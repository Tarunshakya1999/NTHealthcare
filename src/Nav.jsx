import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Nav({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-lg"
      style={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container">

        {/* 🔥 Brand */}
        <Link
          className="navbar-brand fw-bold fs-3 text-white me-4"
          to="/"
          style={{ letterSpacing: "1px" }}
        >
          <i className="fas fa-heartbeat me-2 text-danger"></i>
          <span className="text-light">NT</span>
          <span className="text-info">Healthcare</span>
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">

            {[
              { to: "/", icon: "fa-home", label: "Home" },
              { to: "/about", icon: "fa-info-circle", label: "About" },
              { to: "/services", icon: "fa-stethoscope", label: "Services" },
              { to: "/contact", icon: "fa-phone-alt", label: "Contact" },
              { to: "/weather", icon: "fa-cloud-sun", label: "Weather" },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link text-light px-3 fw-semibold"
                  to={item.to}
                  style={{
                    transition: "0.3s",
                  }}
                >
                  <i className={`fas ${item.icon} me-1`}></i>
                  {item.label}
                </Link>
              </li>
            ))}

            {!username && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning fw-semibold px-3"
                  to="/login"
                >
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3 w-100 w-lg-auto">

            {/* 🔍 Search - FIXED RESPONSIVE VERSION */}
            <li className="nav-item w-100 w-lg-auto">
              <form
                className="d-flex w-100"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-group shadow-sm rounded-pill overflow-hidden" 
                     style={{ width: '100%' }}>
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                      minWidth: "120px",
                      fontSize: "14px"
                    }}
                  />
                  <button 
                    className="btn btn-info text-white"
                    style={{
                      padding: "0.375rem 1rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <i className="fas fa-search d-lg-none"></i> {/* Mobile pe sirf icon */}
                    <span className="d-none d-lg-inline">Search</span> {/* Desktop pe text */}
                  </button>
                </div>
              </form>
            </li>

            {/* 👤 User Dropdown */}
            {username && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light rounded-pill px-4 dropdown-toggle fw-semibold"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  <span className="d-none d-md-inline">{username}</span>
                  <span className="d-md-none">Profile</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">

                  <li>
                    <Link to="/cart" className="dropdown-item py-2">
                      <i className="fas fa-shopping-cart me-2 text-primary"></i>
                      My Cart
                    </Link>
                  </li>

                  {username === "admin" && (
                    <li>
                      <Link to="/addproduct" className="dropdown-item py-2">
                        <i className="fas fa-plus-circle me-2 text-success"></i>
                        Add Product
                      </Link>
                    </li>
                  )}

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button
                      className="dropdown-item text-danger py-2"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>

      {/* Add this style tag for better responsiveness */}
      <style jsx>{`
        @media (max-width: 991px) {
          .navbar-nav {
            width: 100%;
          }
          .input-group {
            width: 100% !important;
            max-width: 100%;
          }
          .nav-item.w-100 {
            margin-bottom: 10px;
          }
        }
        @media (max-width: 576px) {
          .input-group input {
            font-size: 13px !important;
          }
          .navbar-brand {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </nav>
  );
}