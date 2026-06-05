import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";
import Footer from "./Footer";
import InstallButton from "./InstallButton";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const username = localStorage.getItem("username");

  const handleWhatsApp = () =>
    window.open("https://wa.me/917011617976?text=Hello%20NT%20Healthcare%2C%20I%20need%20assistance.", "_blank");
  const handleCall = () => (window.location.href = "tel:+917011617976");
  const handleInstagram = () => window.open("https://instagram.com/nthealthcare", "_blank");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://nthealthcarebackend.onrender.com/api/products/");
      setData(res.data);
    } catch (err) {
      setError("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getData();
    AOS.init({ duration: 800, once: false, easing: "ease-out-cubic" });
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://nthealthcarebackend.onrender.com/api/products/${id}/`);
      setMsg("Product deleted successfully!");
      setData(data.filter((p) => p.id !== id));
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setMsg("Failed to delete product");
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --navy: #050d1a;
          --navy2: #0a1628;
          --teal: #0d9488;
          --teal2: #14b8a6;
          --mint: #6ee7b7;
          --gold: #f59e0b;
          --card-bg: rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.09);
          --text-primary: #f0fdf9;
          --text-muted: #94a3b8;
          --glass: rgba(13, 148, 136, 0.08);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--navy);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          overflow-x: hidden;
        }

        /* ── HERO SECTION ── */
        .nt-hero {
          min-height: 88vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 6rem 0 4rem;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(13,148,136,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(99,102,241,0.12) 0%, transparent 60%),
            linear-gradient(160deg, #050d1a 0%, #0a1a2e 50%, #071a1a 100%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(13,148,136,0.25), transparent 70%);
          top: -100px; right: -100px;
          animation-delay: 0s;
        }

        .hero-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
          bottom: 0; left: 10%;
          animation-delay: -4s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(13,148,136,0.15);
          border: 1px solid rgba(13,148,136,0.3);
          color: var(--mint);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .hero-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--mint);
          box-shadow: 0 0 8px var(--mint);
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .hero-title .accent {
          background: linear-gradient(135deg, var(--teal2), var(--mint));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .hero-cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .btn-primary-nt {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--teal), var(--teal2));
          color: white;
          padding: 14px 28px;
          border-radius: 100px;
          border: none;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(13,148,136,0.4);
        }

        .btn-primary-nt:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(13,148,136,0.5);
          color: white;
        }

        .btn-outline-nt {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--text-primary);
          padding: 14px 28px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-outline-nt:hover {
          border-color: var(--teal2);
          background: rgba(13,148,136,0.1);
          color: var(--mint);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
        }

        .hero-stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--mint);
          line-height: 1;
        }

        .hero-stat-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateX(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .hero-visual.loaded {
          opacity: 1;
          transform: translateX(0);
        }

        .hero-card-stack {
          position: relative;
          height: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-card {
          position: absolute;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 1.2rem 1.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .floating-card.main {
          width: 280px;
          background: linear-gradient(135deg, rgba(13,148,136,0.2), rgba(10,20,40,0.6));
          border-color: rgba(13,148,136,0.3);
          z-index: 3;
          animation: cardFloat 6s ease-in-out infinite;
        }

        .floating-card.secondary {
          width: 220px;
          top: 30px;
          right: 20px;
          z-index: 2;
          animation: cardFloat 6s ease-in-out infinite 2s;
        }

        .floating-card.tertiary {
          width: 180px;
          bottom: 40px;
          left: 10px;
          z-index: 2;
          animation: cardFloat 6s ease-in-out infinite 4s;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .fc-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .fc-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--mint);
        }

        .fc-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .fc-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        /* ── PRODUCTS SECTION ── */
        .products-section {
          padding: 5rem 0 6rem;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-tag {
          display: inline-block;
          background: rgba(13,148,136,0.12);
          color: var(--teal2);
          border: 1px solid rgba(13,148,136,0.25);
          padding: 5px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .section-desc {
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── PRODUCT CARDS ── */
        .product-card-nt {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .product-card-nt::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(13,148,136,0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .product-card-nt:hover {
          transform: translateY(-12px);
          border-color: rgba(13,148,136,0.4);
          box-shadow: 0 30px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(13,148,136,0.2);
        }

        .product-card-nt:hover::before {
          opacity: 1;
        }

        .product-img-wrapper {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, rgba(13,148,136,0.08), rgba(10,20,40,0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid var(--card-border);
        }

        .product-img-wrapper img {
          height: 160px;
          width: 100%;
          object-fit: contain;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 1;
        }

        .product-card-nt:hover .product-img-wrapper img {
          transform: scale(1.1);
        }

        .product-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          z-index: 2;
        }

        .product-badge.hot {
          background: linear-gradient(135deg, var(--gold), #d97706);
        }

        .product-body {
          padding: 1.2rem 1.3rem 1.3rem;
          position: relative;
          z-index: 1;
        }

        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
        }

        .product-price-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .price-old {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .price-new {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--mint);
        }

        .price-save {
          background: rgba(110, 231, 183, 0.12);
          color: var(--mint);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
        }

        .btn-view {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: linear-gradient(135deg, var(--teal), var(--teal2));
          color: white;
          border: none;
          border-radius: 12px;
          padding: 11px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(13,148,136,0.3);
        }

        .btn-view:hover {
          box-shadow: 0 8px 30px rgba(13,148,136,0.5);
          color: white;
          transform: translateY(-1px);
        }

        .btn-admin {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          border-radius: 10px;
          padding: 9px;
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          margin-top: 8px;
          text-decoration: none;
        }

        .btn-edit { background: rgba(245,158,11,0.15); color: var(--gold); border: 1px solid rgba(245,158,11,0.3); }
        .btn-edit:hover { background: rgba(245,158,11,0.25); color: var(--gold); }
        .btn-delete { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
        .btn-delete:hover { background: rgba(239,68,68,0.2); color: #fca5a5; }

        /* ── FLOATING SIDE BUTTONS ── */
        .fab-container {
          position: fixed;
          right: 22px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .fab-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          outline: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .fab-btn:hover {
          transform: scale(1.15);
        }

        .fab-tooltip {
          position: absolute;
          right: 62px;
          background: rgba(10,20,40,0.95);
          color: white;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.25s ease;
          pointer-events: none;
          backdrop-filter: blur(10px);
        }

        .fab-btn:hover .fab-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .fab-wa { background: linear-gradient(135deg, #25D366, #075E54); }
        .fab-call { background: linear-gradient(135deg, #0ea5e9, #0284c7); }
        .fab-ig { background: linear-gradient(45deg, #f09433, #d62976, #962fbf, #4f5bd5); }
        .fab-top { background: linear-gradient(135deg, #64748b, #475569); }

        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(13,148,136,0.4); }
          50% { box-shadow: 0 4px 30px rgba(13,148,136,0.7); }
        }

        /* ── LOADING SPINNER ── */
        .nt-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 5rem 0;
        }

        .loader-ring {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(13,148,136,0.15);
          border-top-color: var(--teal2);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .loader-text {
          color: var(--text-muted);
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        /* ── FEATURES STRIP ── */
        .features-strip {
          border-top: 1px solid var(--card-border);
          border-bottom: 1px solid var(--card-border);
          background: rgba(13,148,136,0.04);
          padding: 1.8rem 0;
          overflow: hidden;
        }

        .features-inner {
          display: flex;
          gap: 3rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 500;
        }

        .feature-item i {
          color: var(--teal2);
          font-size: 1.1rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .fab-container {
            top: auto;
            bottom: 16px;
            right: 16px;
            flex-direction: row;
            transform: none;
          }

          .fab-btn { width: 46px; height: 46px; font-size: 18px; }

          .fab-tooltip { display: none; }

          .hero-cta-group { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-card-stack { display: none; }
        }

        /* ── ALERTS ── */
        .nt-alert {
          background: rgba(13,148,136,0.1);
          border: 1px solid rgba(13,148,136,0.25);
          color: var(--mint);
          padding: 12px 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .nt-alert-danger {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.25);
          color: #fca5a5;
        }
      `}</style>

      <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="nt-hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className={`hero-content ${heroLoaded ? "loaded" : ""}`}>
                <span className="hero-eyebrow">India's Trusted Healthcare Store</span>

                <h1 className="hero-title">
                  Your Health,<br />
                  <span className="accent">Our Priority</span>
                </h1>

                <p className="hero-subtitle">
                  Premium medicines, wellness products & health essentials — delivered fast, 
                  priced right, trusted by thousands across India.
                </p>

                <div className="hero-cta-group">
                  <button
                    className="btn-primary-nt"
                    onClick={() => document.getElementById("products-section").scrollIntoView({ behavior: "smooth" })}
                  >
                    <i className="fas fa-capsules"></i> Shop Now
                  </button>
                  <button className="btn-outline-nt" onClick={handleWhatsApp}>
                    <i className="fab fa-whatsapp"></i> Get Advice
                  </button>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-number">500+</span>
                    <span className="hero-stat-label">Products</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">10K+</span>
                    <span className="hero-stat-label">Customers</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">24/7</span>
                    <span className="hero-stat-label">Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className={`hero-visual ${heroLoaded ? "loaded" : ""}`}>
                <div className="hero-card-stack">
                  <div className="floating-card main">
                    <div className="fc-icon">💊</div>
                    <div className="fc-label">Today's Best Deal</div>
                    <div className="fc-value">₹499</div>
                    <div className="fc-sub">Vitamin D3 Pack — 40% Off</div>
                  </div>
                  <div className="floating-card secondary">
                    <div className="fc-icon">🚚</div>
                    <div className="fc-label">Delivery Status</div>
                    <div className="fc-value" style={{fontSize:"1.1rem", color:"#6ee7b7"}}>Express</div>
                    <div className="fc-sub">Same day in Delhi</div>
                  </div>
                  <div className="floating-card tertiary">
                    <div className="fc-icon">⭐</div>
                    <div className="fc-label">Avg Rating</div>
                    <div className="fc-value">4.9</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <div className="features-strip">
        <div className="container">
          <div className="features-inner">
            {[
              { icon: "fa-truck-fast", text: "Fast Delivery" },
              { icon: "fa-shield-halved", text: "100% Genuine" },
              { icon: "fa-rotate-left", text: "Easy Returns" },
              { icon: "fa-headset", text: "24/7 Support" },
              { icon: "fa-percent", text: "Best Prices" },
            ].map((f, i) => (
              <div className="feature-item" key={i}>
                <i className={`fas ${f.icon}`}></i>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRODUCTS SECTION
      ══════════════════════════════════════ */}
      <section className="products-section" id="products-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title">Handpicked Health Essentials</h2>
            <p className="section-desc">
              From prescription medicines to wellness supplements — everything your family needs.
            </p>
          </div>

          {msg && <div className="nt-alert">{msg}</div>}
          {error && <div className="nt-alert nt-alert-danger">{error}</div>}

          {filteredData.length === 0 ? (
            <div className="nt-loader">
              <div className="loader-ring" />
              <span className="loader-text">Loading products...</span>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {filteredData.map((item, index) => {
                const saved = item.price - item.discounted_price;
                const isOnSale = saved > 0;
                return (
                  <div
                    className="col-sm-10 col-md-6 col-lg-4 col-xl-3"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={Math.min(index * 60, 400)}
                  >
                    <div
                      className="product-card-nt"
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Image */}
                      <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                        <div className="product-img-wrapper">
                          <img src={item.image} alt={item.name} />
                          <span className={`product-badge ${isOnSale ? "" : "hot"}`}>
                            {isOnSale ? "Sale" : "Hot"}
                          </span>
                        </div>
                      </Link>

                      {/* Body */}
                      <div className="product-body">
                        <div className="product-name">{item.name}</div>
                        <div className="product-desc">{item.description}</div>

                        <div className="product-price-row">
                          <span className="price-old">₹{item.price}</span>
                          <span className="price-new">₹{item.discounted_price}</span>
                          {isOnSale && (
                            <span className="price-save">-{Math.round((saved / item.price) * 100)}%</span>
                          )}
                        </div>

                        <Link to={`/product/${item.id}`} className="btn-view">
                          <i className="fas fa-eye"></i> View Details
                        </Link>

                        {username === "admin" && (
                          <>
                            <Link to={`/update/${item.id}`} className="btn-admin btn-edit">
                              <i className="fas fa-pen"></i> Edit
                            </Link>
                            <button
                              className="btn-admin btn-delete"
                              onClick={() => deleteProduct(item.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* ══════════════════════════════════════
          FLOATING ACTION BUTTONS
      ══════════════════════════════════════ */}
      <div className="fab-container">
        <InstallButton />

        <button className="fab-btn fab-wa" onClick={handleWhatsApp}>
          <i className="fab fa-whatsapp"></i>
          <span className="fab-tooltip">WhatsApp</span>
        </button>

        <button className="fab-btn fab-call" onClick={handleCall}>
          <i className="fas fa-phone-alt"></i>
          <span className="fab-tooltip">Call Now</span>
        </button>

        <button className="fab-btn fab-ig" onClick={handleInstagram}>
          <i className="fab fa-instagram"></i>
          <span className="fab-tooltip">Instagram</span>
        </button>

        {showScrollTop && (
          <button className="fab-btn fab-top" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"></i>
            <span className="fab-tooltip">Back to Top</span>
          </button>
        )}
      </div>
    </>
  );
}