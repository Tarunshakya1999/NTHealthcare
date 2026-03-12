import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold logo-glow">🛍️ NTHealthcare</h5>
            <p className="text-light-50">
              Your one-stop shop for quality products. <br />
              Fast delivery, fair prices, and friendly service.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-glow">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">🏠 Home</Link></li>
              <li><Link to="/about" className="footer-link">ℹ️ About</Link></li>
              <li><Link to="/services" className="footer-link">🛠️ Services</Link></li>
              <li><Link to="/contact" className="footer-link">📞 Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-glow">Follow Us</h6>
            <div className="d-flex gap-3 social-icons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-github"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center text-light-50 small">
          © {new Date().getFullYear()} <strong>NTHealthcare</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
