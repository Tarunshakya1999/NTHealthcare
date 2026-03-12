import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
        background: "linear-gradient(90deg,#0f2027,#203a43,#2c5364)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container-fluid px-3 px-lg-4">

        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 text-white"
          to="/"
          style={{ letterSpacing: "1px" }}
        >
          <i className="fas fa-heartbeat me-2 text-danger"></i>
          <span className="text-light">NT</span>
          <span className="text-info">Healthcare</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">

          {/* Nav Links */}
          <ul className="navbar-nav me-auto mb-3 mb-lg-0 text-center text-lg-start">

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
          <ul className="navbar-nav ms-lg-auto align-items-center gap-3">

            {/* Search */}
            <li className="nav-item w-100 w-lg-auto">
              <form
                className="d-flex w-100"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-group shadow-sm rounded-pill overflow-hidden w-100">
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-info text-white px-3">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li>

            {/* User Dropdown */}
            {username && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light rounded-pill px-4 dropdown-toggle fw-semibold"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  {username}
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

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

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
    </nav>
  );
}