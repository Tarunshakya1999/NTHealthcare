// src/components/Services.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --teal:   #0a9396;
    --mint:   #94d2bd;
    --navy:   #001219;
    --cream:  #f8f5f0;
    --gold:   #e9c46a;
    --white:  #ffffff;
  }

  * { box-sizing: border-box; }
  body { background: var(--cream); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-ring {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-12px) rotate(2deg); }
  }
  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes notifIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .nt-hero-bg {
    background: var(--navy);
    position: relative;
    overflow: hidden;
  }
  .nt-hero-bg::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 10% 50%, rgba(10,147,150,.35) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 90% 20%, rgba(148,210,189,.2) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(238,108,77,.15) 0%, transparent 60%);
  }
  .nt-hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  /* ── Service Cards ── */
  .nt-service-card {
    animation: fadeUp 0.6s ease both;
    background: var(--white);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease;
    box-shadow: 0 4px 24px rgba(0,18,25,.07);
    border: 1px solid rgba(0,18,25,.06);
    cursor: pointer;
  }
  .nt-service-card::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 20px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, var(--teal), var(--mint)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .nt-service-card:hover { transform: translateY(-10px) scale(1.01); box-shadow: 0 24px 56px rgba(10,147,150,.18); }
  .nt-service-card:hover::before { opacity: 1; }
  .nt-service-card:nth-child(1) { animation-delay: .05s; }
  .nt-service-card:nth-child(2) { animation-delay: .1s; }
  .nt-service-card:nth-child(3) { animation-delay: .15s; }
  .nt-service-card:nth-child(4) { animation-delay: .2s; }
  .nt-service-card:nth-child(5) { animation-delay: .25s; }
  .nt-service-card:nth-child(6) { animation-delay: .3s; }

  .nt-icon-box {
    width: 72px; height: 72px;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--teal) 0%, #0a7a7c 100%);
    box-shadow: 0 8px 24px rgba(10,147,150,.35);
    font-size: 28px; color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }
  .nt-service-card:hover .nt-icon-box {
    transform: rotate(-6deg) scale(1.1);
    box-shadow: 0 12px 32px rgba(10,147,150,.5);
  }
  .nt-icon-box::after {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 22px;
    border: 2px solid rgba(10,147,150,.3);
    animation: pulse-ring 2s ease-out infinite;
  }

  .nt-tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px; font-weight: 600;
    letter-spacing: .5px; text-transform: uppercase;
    background: rgba(10,147,150,.1); color: var(--teal);
  }

  .nt-btn-primary {
    background: var(--navy); color: var(--white);
    border: none; padding: 11px 24px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600; font-size: 13px; letter-spacing: .3px;
    cursor: pointer; transition: all 0.3s ease;
    display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
  }
  .nt-btn-primary:hover {
    background: var(--teal); color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(10,147,150,.4);
    text-decoration: none;
  }

  /* ── Modal ── */
  .nt-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,18,25,.78);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    /* sits above everything including navbar */
    z-index: 99999;
    padding: 80px 20px 20px;   /* top padding keeps it below navbar area */
    animation: fadeIn 0.25s ease;
  }
  .nt-modal {
    background: var(--white);
    border-radius: 28px;
    padding: 0;
    max-width: 500px;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex; flex-direction: column;
    animation: fadeUp 0.35s cubic-bezier(.22,1,.36,1);
    box-shadow: 0 40px 100px rgba(0,18,25,.4);
  }
  .nt-modal-header {
    background: var(--navy);
    padding: 40px 32px 28px;
    position: relative;
    text-align: center;
    flex-shrink: 0;
  }
  /* Close button — inside the dark header, always fully visible */
  .nt-close-btn {
    position: absolute;
    top: 14px; right: 14px;
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,.14);
    border: 1.5px solid rgba(255,255,255,.28);
    color: white;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all .25s;
    z-index: 2;
  }
  .nt-close-btn:hover {
    background: rgba(255,255,255,.26);
    transform: rotate(90deg);
  }
  .nt-modal-body {
    padding: 26px 32px 32px;
    overflow-y: auto;
  }

  .nt-feature-item {
    display: flex; align-items: center; gap: 14px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(0,18,25,.06);
    animation: slideRight 0.4s ease both;
  }
  .nt-feature-item:last-child { border-bottom: none; }
  .nt-feature-icon {
    width: 36px; height: 36px;
    background: rgba(10,147,150,.1);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--teal); flex-shrink: 0;
  }

  .nt-stat-badge {
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 14px; padding: 18px 22px;
    text-align: center; backdrop-filter: blur(10px);
  }

  .nt-marquee-track {
    animation: marquee 24s linear infinite;
    display: flex; width: max-content;
  }

  .nt-notif {
    position: fixed; top: 24px; right: 24px;
    border-radius: 14px; padding: 14px 22px;
    color: white;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    z-index: 999999;
    display: flex; align-items: center; gap: 10px;
    animation: notifIn 0.4s cubic-bezier(.22,1,.36,1);
    box-shadow: 0 12px 32px rgba(0,0,0,.25); max-width: 340px;
  }

  .nt-spinner {
    width: 44px; height: 44px;
    border: 3px solid rgba(10,147,150,.2);
    border-top-color: var(--teal);
    border-radius: 50%; animation: spin 0.9s linear infinite;
  }

  .nt-section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--teal);
  }

  .nt-divider {
    width: 48px; height: 3px;
    background: linear-gradient(90deg, var(--teal), var(--mint));
    border-radius: 2px; margin: 14px auto;
  }

  .nt-why-card {
    background: var(--white); border-radius: 20px;
    padding: 32px 28px;
    border: 1px solid rgba(0,18,25,.06);
    transition: all 0.3s ease;
    animation: fadeUp 0.5s ease both;
  }
  .nt-why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(10,147,150,.12); }

  .nt-cta-section {
    background: var(--navy); border-radius: 28px;
    padding: 56px 48px; position: relative;
    overflow: hidden; text-align: center;
  }
  .nt-cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(10,147,150,.25) 0%, transparent 70%);
  }

  .nt-testimonial-card {
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 18px; padding: 28px;
    backdrop-filter: blur(10px);
  }

  @media (max-width: 768px) {
    .nt-modal-overlay { padding: 70px 16px 16px; }
    .nt-modal-header { padding: 36px 24px 24px; }
    .nt-modal-body { padding: 20px 24px 28px; }
    .nt-cta-section { padding: 40px 28px; }
  }
`;

const WHY_CHOOSE = [
  { icon: "bi-shield-check", title: "Certified Experts", desc: "All our healthcare professionals hold valid certifications and undergo rigorous background checks.", delay: ".05s" },
  { icon: "bi-clock", title: "24/7 Availability", desc: "Round-the-clock care whenever you need it — day, night, or weekend.", delay: ".1s" },
  { icon: "bi-house-heart", title: "At-Home Comfort", desc: "Receive world-class care in the comfort of your own home.", delay: ".15s" },
  { icon: "bi-currency-dollar", title: "Transparent Pricing", desc: "No hidden fees. Clear, upfront costs with flexible payment options.", delay: ".2s" },
];

const TESTIMONIALS = [
  { name: "Rajesh Sharma", role: "Patient", text: "NT Healthcare changed my life. The nursing team was compassionate, professional, and always on time.", stars: 5 },
  { name: "Priya Menon", role: "Caregiver", text: "The elderly care service gave our family so much peace of mind. Highly recommend!", stars: 5 },
  { name: "Amit Verma", role: "Patient", text: "Doctor consultations at home are incredibly convenient. The app is seamless.", stars: 5 },
];

const STATS = [
  { value: "15K+", label: "Happy Patients" },
  { value: "500+", label: "Certified Experts" },
  { value: "98%",  label: "Satisfaction Rate" },
  { value: "12+",  label: "Years of Care" },
];

const MARQUEE_ITEMS = ["🏥 Trusted Healthcare", "💊 Expert Professionals", "❤️ Compassionate Care", "🏠 Home Delivery", "⚡ 24/7 Support", "🔬 Advanced Diagnostics"];

const FEATURES = [
  { icon: "bi-shield-check",   text: "Certified & Verified Professionals" },
  { icon: "bi-clock-history",  text: "Available 24 Hours, 7 Days a Week" },
  { icon: "bi-house-heart",    text: "Delivered Right to Your Door" },
  { icon: "bi-graph-up-arrow", text: "Real-Time Progress Tracking" },
  { icon: "bi-chat-dots",      text: "Dedicated Care Coordinator" },
];

export default function Services() {
  const [services, setServices]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal]         = useState(false);
  const [notification, setNotification]   = useState({ show: false, message: "", type: "" });
  const styleRef = useRef(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement("style");
      el.innerHTML = CSS;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => { if (styleRef.current) { document.head.removeChild(styleRef.current); styleRef.current = null; } };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/services/active_services/", { timeout: 5000 });
      if (response.data && response.data.length > 0) { setServices(response.data); setError(null); }
      else { setServices([]); setError("No services available at the moment"); }
    } catch {
      setServices([
        { id: 1, title: "Home Nursing Care",  description: "Expert nurses visit your home to provide personalized medical care, wound dressing, and medication management.", icon: "bi-heart-pulse",   tag: "Popular" },
        { id: 2, title: "Doctor on Demand",   description: "Connect with certified doctors within minutes for consultations, prescriptions, and follow-ups — from home.",  icon: "bi-person-video3", tag: "New" },
        { id: 3, title: "Physiotherapy",      description: "Qualified physiotherapists provide rehabilitation and pain management therapy at your doorstep.",               icon: "bi-activity",      tag: "Popular" },
        { id: 4, title: "Lab Tests at Home",  description: "Collect samples at home and get reports digitally. Covers 500+ diagnostic tests.",                             icon: "bi-droplet",       tag: "" },
        { id: 5, title: "Elderly Care",       description: "Compassionate caregivers assist seniors with daily activities, companionship, and health monitoring.",          icon: "bi-emoji-smile",   tag: "Trusted" },
        { id: 6, title: "Mental Wellness",    description: "Licensed counselors and therapists for stress management, anxiety relief, and emotional support.",              icon: "bi-brain",         tag: "New" },
      ]);
      setError(null);
    } finally { setLoading(false); }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3500);
  };

  const handleKnowMore   = (service) => { setSelectedService(service); setShowModal(true); };
  const handleCloseModal = ()         => { setShowModal(false); setSelectedService(null); };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
      <Nav />

      {/* ── Notification ── */}
      {notification.show && (
        <div className="nt-notif" style={{ background: "linear-gradient(135deg,#0a9396,#0a7a7c)" }}>
          <i className="bi bi-check-circle-fill" style={{ fontSize: 18 }}></i>
          {notification.message}
        </div>
      )}

      {/* ══════════════════════════════════════════
          MODAL
          z-index: 99999 — above navbar
          padding-top: 80px — so overlay never sits under Nav
      ══════════════════════════════════════════ */}
      {showModal && selectedService && (
        <div className="nt-modal-overlay" onClick={handleCloseModal}>
          <div className="nt-modal" onClick={(e) => e.stopPropagation()}>

            {/* Dark header with close btn INSIDE it */}
            <div className="nt-modal-header">
              <button className="nt-close-btn" onClick={handleCloseModal} aria-label="Close modal">
                <i className="bi bi-x-lg"></i>
              </button>

              {selectedService.tag && (
                <div style={{ marginBottom: 14 }}>
                  <span style={{ background: "var(--gold)", color: "var(--navy)", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 12px", borderRadius: 20 }}>
                    {selectedService.tag}
                  </span>
                </div>
              )}

              <div style={{ width: 76, height: 76, borderRadius: 22, background: "linear-gradient(135deg,var(--teal),#0a7a7c)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 12px 32px rgba(10,147,150,.5)", animation: "float 4s ease-in-out infinite" }}>
                <i className={`bi ${selectedService.icon}`} style={{ fontSize: 32, color: "white" }}></i>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 800, color: "white", margin: 0 }}>
                {selectedService.title}
              </h2>
            </div>

            {/* Body — description + features only (no Book/Share buttons) */}
            <div className="nt-modal-body">
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#555", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 22 }}>
                {selectedService.description}
              </p>

              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--teal)", marginBottom: 10 }}>
                What's Included
              </div>

              {FEATURES.map((f, i) => (
                <div key={i} className="nt-feature-item" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="nt-feature-icon">
                    <i className={`bi ${f.icon}`} style={{ fontSize: 16 }}></i>
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", color: "#333", fontSize: "0.9rem", fontWeight: 500 }}>
                    {f.text}
                  </span>
                </div>
              ))}

              {/* Single CTA — Get In Touch */}
              <Link
                to="/contact"
                onClick={handleCloseModal}
                style={{ marginTop: 26, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--navy)", color: "white", borderRadius: 12, padding: "14px 20px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--teal)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--navy)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <i className="bi bi-envelope-check"></i> Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ══════ HERO ══════ */}
      <div className="nt-hero-bg" style={{ padding: "80px 0 64px" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
          <div className="nt-section-label" style={{ color: "var(--mint)", marginBottom: 20 }}>NT Healthcare · Your Wellness Partner</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6vw,4.2rem)", fontWeight: 800, color: "white", margin: "0 0 22px", lineHeight: 1.15 }}>
            Healthcare That Comes{" "}
            <span style={{ color: "var(--mint)", fontStyle: "italic" }}>to You</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,.7)", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Premium medical services delivered by certified professionals — straight to your home, office, or wherever you are.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 720, margin: "0 auto" }}>
            {STATS.map((s, i) => (
              <div key={i} className="nt-stat-badge">
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--mint)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,.55)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ MARQUEE ══════ */}
      <div style={{ background: "var(--teal)", padding: "12px 0", overflow: "hidden" }}>
        <div className="nt-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "white", padding: "0 40px", whiteSpace: "nowrap", opacity: .9 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ══════ SERVICES ══════ */}
      <div style={{ background: "var(--cream)", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 1200 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="nt-section-label">What We Offer</div>
            <div className="nt-divider"></div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.9rem)", fontWeight: 800, color: "var(--navy)", margin: "0 0 16px" }}>Our Healthcare Services</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", color: "#666", maxWidth: 580, margin: "0 auto" }}>
              From everyday wellness to specialized care — we've got every need covered with expert professionals.
            </p>
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 18 }}>
              <div className="nt-spinner"></div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#999", fontSize: "0.9rem" }}>Loading services…</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "60px 24px", background: "white", borderRadius: 20, maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,18,25,.07)" }}>
              <i className="bi bi-wifi-off" style={{ fontSize: 48, color: "#ccc" }}></i>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", marginTop: 16 }}>Connection Error</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#888" }}>{error}</p>
              <button className="nt-btn-primary" onClick={fetchServices} style={{ marginTop: 8 }}>
                <i className="bi bi-arrow-clockwise"></i> Try Again
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {services.map((service) => (
                <div key={service.id} className="nt-service-card" onClick={() => handleKnowMore(service)}>
                  <div style={{ padding: "32px 28px 28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                      <div className="nt-icon-box">
                        <i className={`bi ${service.icon || "bi-heart-pulse"}`}></i>
                      </div>
                      {service.tag && <span className="nt-tag">{service.tag}</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--navy)", marginBottom: 10 }}>{service.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#666", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: 24 }}>{service.description}</p>
                    <button
                      className="nt-btn-primary"
                      onClick={(e) => { e.stopPropagation(); handleKnowMore(service); }}
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════ WHY CHOOSE US ══════ */}
      <div style={{ background: "white", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: 1200 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="nt-section-label">Why NT Healthcare</div>
              <div className="nt-divider" style={{ margin: "14px 0" }}></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, color: "var(--navy)", margin: "0 0 20px", lineHeight: 1.2 }}>
                Care You Can Trust, <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Always</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#666", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 32 }}>
                We set the standard in home healthcare by combining medical excellence with genuine compassion. Every professional on our platform is vetted, trained, and passionate about patient wellbeing.
              </p>
              <Link to="/contact" className="nt-btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                <i className="bi bi-calendar-check"></i> Get In Touch Now
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {WHY_CHOOSE.map((item, i) => (
                <div key={i} className="nt-why-card" style={{ animationDelay: item.delay }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,var(--teal),#0a7a7c)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, boxShadow: "0 6px 16px rgba(10,147,150,.3)" }}>
                    <i className={`bi ${item.icon}`} style={{ fontSize: 22, color: "white" }}></i>
                  </div>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#777", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════ TESTIMONIALS ══════ */}
      <div className="nt-hero-bg" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: 1200, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="nt-section-label" style={{ color: "var(--mint)" }}>Patient Stories</div>
            <div className="nt-divider"></div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, color: "white", margin: 0 }}>What Our Patients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="nt-testimonial-card">
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <i key={j} className="bi bi-star-fill" style={{ color: "var(--gold)", fontSize: 14 }}></i>
                  ))}
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.8)", lineHeight: 1.75, fontSize: "0.92rem", margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,var(--teal),var(--mint))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "white", fontSize: "1rem" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "white", fontSize: "0.88rem" }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: "0.75rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <div style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className="nt-cta-section">
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="nt-section-label" style={{ color: "var(--mint)", marginBottom: 16 }}>Get Started</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: "white", margin: "0 0 18px", lineHeight: 1.2 }}>
                Ready to Experience Better Healthcare?
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.7)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8 }}>
                Join 15,000+ families who trust NT Healthcare for reliable, compassionate, and expert care delivered at home.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/contact"
                  style={{ background: "var(--teal)", color: "white", padding: "15px 36px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1rem", transition: "all .3s", display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--mint)"; e.currentTarget.style.color = "var(--navy)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--teal)"; e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <i className="bi bi-envelope-check-fill"></i> Send Message Now
                </Link>
                <a
                  href="tel:+917011617976"
                  style={{ textDecoration: "none", background: "rgba(255,255,255,.1)", color: "white", border: "2px solid rgba(255,255,255,.3)", padding: "15px 36px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "1rem", transition: "all .3s", display: "inline-flex", alignItems: "center", gap: 10 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <i className="bi bi-telephone-fill"></i> +91 70116 17976
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ FOOTER ══════ */}
      <div style={{ background: "var(--navy)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.4)", fontSize: "0.82rem", margin: 0 }}>
          © {new Date().getFullYear()} NT Healthcare · All rights reserved · Built with ❤️ for better health
        </p>
      </div>
    </>
  );
}