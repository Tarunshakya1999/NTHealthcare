import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./App.css";
import Nav from "./Nav";
import Footer from "./Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import InstallButton from "./InstallButton";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const username = localStorage.getItem("username");

  // CTA handlers
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/917011617976?text=Hello%20NT%20Healthcare%2C%20I%20need%20assistance%20with%20your%20products.",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+917011617976";
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/nthealthcare", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show/hide scroll button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://nthealthcarebackend.onrender.com/api/products/"
      );
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Something went wrong while fetching data");
    }
  };

  useEffect(() => {
    getData();
    AOS.init({ duration: 1000, once: false });
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://nthealthcarebackend.onrender.com/api/products/${id}/`
      );
      setMsg("Product deleted successfully!");
      setData(data.filter((product) => product.id !== id));
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error(err);
      setMsg("Failed to delete product");
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ====== CTA + Install Button Styles ======
  const ctaContainerStyle = {
    position: "fixed",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  };

  const ctaButtonStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    position: "relative",
    outline: "none",
  };

  const tooltipStyle = {
    position: "absolute",
    right: "70px",
    background: "white",
    color: "#333",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.3s ease",
    pointerEvents: "none",
  };

  return (
    <>
      <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* ===== FLOATING BUTTONS ===== */}
      <div style={ctaContainerStyle}>
        {/* Install App (PWA) – only shows when install prompt is available */}
        <InstallButton />

        {/* WhatsApp */}
        <button
          style={{
            ...ctaButtonStyle,
            background: "linear-gradient(135deg, #25D366, #128C7E)",
          }}
          onClick={handleWhatsApp}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "1"; tip.style.visibility = "visible"; }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "0"; tip.style.visibility = "hidden"; }
          }}
        >
          <i className="fab fa-whatsapp"></i>
          <span className="tooltip" style={tooltipStyle}>WhatsApp</span>
        </button>

        {/* Call */}
        <button
          style={{
            ...ctaButtonStyle,
            background: "linear-gradient(135deg, #007bff, #00d4ff)",
          }}
          onClick={handleCall}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "1"; tip.style.visibility = "visible"; }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "0"; tip.style.visibility = "hidden"; }
          }}
        >
          <i className="fas fa-phone-alt"></i>
          <span className="tooltip" style={tooltipStyle}>Call Now</span>
        </button>

        {/* Instagram */}
        <button
          style={{
            ...ctaButtonStyle,
            background: "linear-gradient(45deg, #f09433, #d62976, #962fbf, #4f5bd5)",
          }}
          onClick={handleInstagram}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "1"; tip.style.visibility = "visible"; }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            const tip = e.currentTarget.querySelector(".tooltip");
            if (tip) { tip.style.opacity = "0"; tip.style.visibility = "hidden"; }
          }}
        >
          <i className="fab fa-instagram"></i>
          <span className="tooltip" style={tooltipStyle}>Instagram</span>
        </button>

        {/* Scroll to Top – shown only when scrolled down */}
        {showScrollTop && (
          <button
            style={{
              ...ctaButtonStyle,
              background: "linear-gradient(135deg, #6c757d, #495057)",
              marginTop: "6px",
            }}
            onClick={scrollToTop}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              const tip = e.currentTarget.querySelector(".tooltip");
              if (tip) { tip.style.opacity = "1"; tip.style.visibility = "visible"; }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              const tip = e.currentTarget.querySelector(".tooltip");
              if (tip) { tip.style.opacity = "0"; tip.style.visibility = "hidden"; }
            }}
          >
            <i className="fas fa-arrow-up"></i>
            <span className="tooltip" style={tooltipStyle}>Back to Top</span>
          </button>
        )}
      </div>

      {/* ===== PRODUCTS SECTION ===== */}
      <div className="container my-5">
        {msg && <div className="alert alert-info text-center">{msg}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {filteredData.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            {filteredData.map((item, index) => (
              <div
                className="col-sm-10 col-md-6 col-lg-4 mb-4"
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="card product-card p-2 shadow-sm border-0 h-100">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="position-relative bg-light rounded-top p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top product-image"
                      />
                      <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                        {item.discounted_price < item.price ? "Sale" : "Hot"}
                      </span>
                    </div>
                  </Link>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark text-truncate">
                      {item.name}
                    </h5>
                    <p className="card-text text-muted small text-truncate">
                      {item.description}
                    </p>

                    <div className="mt-auto">
                      <p className="fw-bold mb-2">
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{item.price}
                        </span>
                        <span className="text-success">
                          ₹{item.discounted_price}
                        </span>
                      </p>

                      <Link
                        to={`/product/${item.id}`}
                        className="btn gradient-btn w-100 mt-2 rounded-pill"
                      >
                        <i className="fa-solid fa-eye"></i> View Detail
                      </Link>

                      {username === "admin" && (
                        <>
                          <Link to={`/update/${item.id}`}>
                            <button className="btn btn-warning w-100 mt-2 rounded-pill">
                              <i className="fa-solid fa-pen-to-square"></i> Update
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger w-100 mt-2 rounded-pill"
                            onClick={() => deleteProduct(item.id)}
                          >
                            <i className="fa-solid fa-trash"></i> Delete Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style>{`
        /* Floating button animation */
        @keyframes pulseFloat {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        .gradient-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          transition: all 0.3s ease;
        }

        .gradient-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          color: white;
        }

        .product-card {
          transition: all 0.3s ease;
          border-radius: 15px;
          overflow: hidden;
          background: white;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15) !important;
        }

        .product-image {
          height: 200px;
          object-fit: contain;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .product-card:hover .product-image {
          transform: scale(1.07);
        }

        /* Mobile: move floating buttons to bottom row */
        @media (max-width: 768px) {
          .cta-container {
            top: auto !important;
            bottom: 15px;
            transform: none !important;
            right: 15px;
            flex-direction: row !important;
            gap: 10px;
          }

          .cta-button {
            width: 48px !important;
            height: 48px !important;
            font-size: 20px !important;
          }
        }
      `}</style>
    </>
  );
}