import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --teal: #0a7e7e;
    --teal-light: #12a5a5;
    --teal-pale: #e6f7f7;
    --teal-mid: #c2ecec;
    --green-dark: #27ae60;
    --navy: #0d2b45;
    --text: #1a2e3b;
    --muted: #6b8a9a;
    --bg: #f3fafa;
  }

  .pd-page { font-family: 'DM Sans', sans-serif; background: var(--bg); min-height: 100vh; }

  .pd-breadcrumb {
    max-width: 1100px; margin: 0 auto; padding: 18px 2rem 0;
    display: flex; align-items: center; gap: 8px;
    font-size: 0.82rem; color: var(--muted);
  }
  .pd-breadcrumb a { color: var(--teal); text-decoration: none; font-weight: 600; }
  .pd-bc-sep { color: var(--teal-mid); }

  .pd-container {
    max-width: 1100px; margin: 0 auto; padding: 28px 2rem 60px;
  }

  .pd-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(10,126,126,0.12), 0 4px 16px rgba(0,0,0,0.06);
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1.5px solid var(--teal-mid);
    overflow: hidden;
    animation: pdFadeUp 0.5s ease both;
  }

  @keyframes pdFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pd-img-panel {
    background: linear-gradient(160deg, var(--teal-pale) 0%, #ddf4f4 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 2rem;
    position: relative;
    border-right: 1.5px solid var(--teal-mid);
  }

  .pd-badge-brand {
    position: absolute; top: 20px; left: 20px;
    background: linear-gradient(135deg, var(--teal), var(--teal-light));
    color: #fff; font-size: 0.7rem; font-weight: 800;
    padding: 5px 12px; border-radius: 50px;
    text-transform: uppercase; letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(10,126,126,0.35);
  }

  .pd-badge-rx {
    position: absolute; top: 20px; right: 20px;
    background: #fff; border: 2px solid var(--teal-mid);
    color: var(--teal); font-size: 0.72rem; font-weight: 800;
    padding: 4px 12px; border-radius: 50px;
  }

  .pd-img-wrap {
    width: 280px; height: 280px;
    background: #fff; border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 12px 40px rgba(10,126,126,0.14), 0 2px 8px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .pd-img-wrap img {
    width: 90%; height: 90%; object-fit: contain;
    transition: transform 0.35s ease;
  }
  .pd-img-wrap:hover img { transform: scale(1.06); }

  .pd-trust-strip {
    display: flex; gap: 10px; margin-top: 24px;
    flex-wrap: wrap; justify-content: center;
  }
  .pd-trust-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.73rem; font-weight: 600; color: var(--teal);
    background: #fff; padding: 5px 12px;
    border-radius: 50px; border: 1.5px solid var(--teal-mid);
  }

  .pd-detail {
    padding: 3rem 2.5rem;
    display: flex; flex-direction: column;
  }

  .pd-category-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--teal-pale); color: var(--teal);
    font-size: 0.72rem; font-weight: 800;
    padding: 5px 14px; border-radius: 50px;
    text-transform: uppercase; letter-spacing: 0.8px;
    width: fit-content; margin-bottom: 14px;
    border: 1.5px solid var(--teal-mid);
  }

  .pd-name {
    font-family: 'Nunito', sans-serif;
    font-size: 2rem; font-weight: 900;
    color: var(--navy); line-height: 1.15;
    margin-bottom: 8px; letter-spacing: -0.5px;
  }

  .pd-brand-tag {
    font-size: 0.82rem; font-weight: 600;
    color: var(--muted); margin-bottom: 16px;
  }
  .pd-brand-tag strong { color: var(--teal); }

  .pd-rating-row {
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  }
  .pd-stars { color: #f4a500; font-size: 0.9rem; letter-spacing: 1px; }
  .pd-in-stock {
    background: #e8fdf2; border: 1.5px solid #2ecc71;
    color: #1a7a47; font-size: 0.72rem; font-weight: 800;
    padding: 4px 12px; border-radius: 50px;
  }

  .pd-divider { border: none; border-top: 1.5px solid var(--teal-mid); margin: 16px 0; }

  .pd-price-block {
    display: flex; align-items: baseline; gap: 14px; margin-bottom: 4px;
  }
  .pd-price-current {
    font-family: 'Nunito', sans-serif;
    font-size: 2.4rem; font-weight: 900;
    color: var(--green-dark); line-height: 1;
  }
  .pd-price-original {
    font-size: 1.1rem; font-weight: 600;
    color: var(--muted); text-decoration: line-through;
  }
  .pd-discount-pill {
    background: #fff3e0; border: 1.5px solid #ffcc80;
    color: #e65100; font-size: 0.75rem; font-weight: 800;
    padding: 3px 10px; border-radius: 50px;
  }

  .pd-price-note { font-size: 0.76rem; color: var(--muted); margin-bottom: 16px; }

  .pd-desc { font-size: 0.88rem; line-height: 1.7; color: #4a6070; margin-bottom: 20px; }

  .pd-feature-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 22px;
  }
  .pd-feature-item {
    display: flex; align-items: center; gap: 8px;
    background: var(--teal-pale); border: 1.5px solid var(--teal-mid);
    border-radius: 12px; padding: 10px 12px;
    font-size: 0.78rem; font-weight: 600; color: var(--teal);
  }

  .pd-qty-row {
    display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
  }
  .pd-qty-label { font-size: 0.82rem; font-weight: 700; color: var(--navy); }
  .pd-qty-ctrl {
    display: flex; align-items: center;
    border: 2px solid var(--teal-mid); border-radius: 50px;
    overflow: hidden; background: #fff;
  }
  .pd-qty-btn {
    width: 36px; height: 36px; border: none; background: transparent;
    font-size: 1.1rem; font-weight: 700; color: var(--teal);
    cursor: pointer; transition: background 0.15s;
  }
  .pd-qty-btn:hover { background: var(--teal-pale); }
  .pd-qty-val { min-width: 36px; text-align: center; font-weight: 800; font-size: 0.95rem; }

  .pd-btn-cart {
    background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
    color: #fff; border: none;
    padding: 15px 24px; border-radius: 14px;
    font-size: 1rem; font-weight: 800;
    font-family: 'Nunito', sans-serif;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 8px;
    box-shadow: 0 6px 24px rgba(10,126,126,0.35);
    transition: all 0.2s; margin-bottom: 12px;
  }
  .pd-btn-cart:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(10,126,126,0.45); }

  .pd-btn-view {
    background: #fff; color: var(--teal);
    border: 2.5px solid var(--teal);
    padding: 13px 24px; border-radius: 14px;
    font-size: 0.95rem; font-weight: 800;
    font-family: 'Nunito', sans-serif;
    cursor: pointer; text-decoration: none;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.2s;
  }
  .pd-btn-view:hover { background: var(--teal-pale); transform: translateY(-1px); }

  .pd-safety-notice {
    margin-top: 18px; background: #fff9e6;
    border: 1.5px solid #ffe082; border-radius: 12px;
    padding: 12px 16px; display: flex; gap: 10px;
  }
  .pd-safety-text { font-size: 0.74rem; color: #7a5500; line-height: 1.5; }
  .pd-safety-text strong { display: block; margin-bottom: 2px; }

  .pd-info-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-top: 28px;
  }
  .pd-info-card {
    background: #fff; border: 1.5px solid var(--teal-mid);
    border-radius: 16px; padding: 18px 16px; text-align: center;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .pd-info-card:hover { box-shadow: 0 8px 24px rgba(10,126,126,0.12); transform: translateY(-3px); }
  .pd-info-card-icon { font-size: 1.8rem; margin-bottom: 8px; }
  .pd-info-card-title { font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem; color: var(--navy); margin-bottom: 4px; }
  .pd-info-card-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.4; }

  .pd-spinner-wrap {
    min-height: 60vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    background: var(--bg);
  }
  .pd-spinner {
    width: 52px; height: 52px;
    border: 4px solid var(--teal-mid);
    border-top-color: var(--teal);
    border-radius: 50%; animation: spin 0.9s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .pd-spinner-text { font-weight: 600; color: var(--muted); font-size: 0.9rem; }

  @media (max-width: 768px) {
    .pd-card { grid-template-columns: 1fr; }
    .pd-img-panel { border-right: none; border-bottom: 1.5px solid var(--teal-mid); }
    .pd-detail { padding: 2rem 1.5rem; }
    .pd-name { font-size: 1.5rem; }
    .pd-info-strip { grid-template-columns: 1fr 1fr; }
    .pd-feature-grid { grid-template-columns: 1fr; }
  }
`;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const navigate = useNavigate();

  // ✅ SCROLL FIX — page change hote hi top pe le jaata hai
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    axios
      .get(`https://nthealthcarebackend.onrender.com/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to add products to cart.");
      return;
    }
    try {
      await axios.post(
        "https://nthealthcarebackend.onrender.com/api/cart/",
        { product: product.id, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2500);
    } catch (err) {
      alert("Failed to add to cart. Please login again.");
      navigate("/login");
    }
  };

  const discountPercent = product
    ? Math.round(((product.price - product.discounted_price) / product.price) * 100)
    : 0;

  if (!product) {
    return (
      <>
        <style>{styles}</style>
        <Nav />
        <div className="pd-spinner-wrap">
          <div className="pd-spinner" />
          <span className="pd-spinner-text">Loading product details...</span>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Nav />

      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span className="pd-bc-sep">›</span>
        <Link to="/about">About Us</Link>
        <span className="pd-bc-sep">›</span>
        <span>{product.name}</span>
      </div>

      <div className="pd-container">
        <div className="pd-card">

          {/* IMAGE PANEL */}
          <div className="pd-img-panel">
            <div className="pd-badge-brand">✦ Zeeva Pharma</div>
            <div className="pd-badge-rx">Rx Required</div>
            <div className="pd-img-wrap">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="pd-trust-strip">
              {["✔ Genuine", "🏥 Certified", "🔬 Lab Tested", "⚡ Fast Delivery"].map((t) => (
                <span className="pd-trust-item" key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* DETAIL PANEL */}
          <div className="pd-detail">
            <div className="pd-category-tag">🩺 Healthcare Product</div>
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-brand-tag">by <strong>Zeeva Pharmaceuticals</strong></div>

            <div className="pd-rating-row">
              <span className="pd-stars">★★★★★</span>
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>4.8</span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>(1,240 reviews)</span>
              <span className="pd-in-stock">✔ In Stock</span>
            </div>

            <hr className="pd-divider" />

            <div className="pd-price-block">
              <span className="pd-price-current">₹{product.discounted_price}</span>
              <span className="pd-price-original">₹{product.price}</span>
              {discountPercent > 0 && (
                <span className="pd-discount-pill">{discountPercent}% OFF</span>
              )}
            </div>
            <div className="pd-price-note">Inclusive of all taxes · MRP ₹{product.price}</div>

            <p className="pd-desc">{product.description}</p>

            <div className="pd-feature-grid">
              {[
                ["🔬", "GMP Certified"],
                ["🌡️", "Store Below 25°C"],
                ["⏱️", "18 Months Expiry"],
                ["🏭", "ISO 9001:2015"],
              ].map(([icon, label]) => (
                <div className="pd-feature-item" key={label}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

            <div className="pd-qty-row">
              <span className="pd-qty-label">Quantity:</span>
              <div className="pd-qty-ctrl">
                <button className="pd-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span className="pd-qty-val">{qty}</span>
                <button className="pd-qty-btn" onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>strips</span>
            </div>

            <button className="pd-btn-cart" onClick={addToCart}>
              {cartAdded ? "✅ Added to Cart!" : "🛒 Add to Cart"}
            </button>

            <Link to="/cart" className="pd-btn-view">
              👁 View Cart
            </Link>

            <div className="pd-safety-notice">
              <span>⚠️</span>
              <div className="pd-safety-text">
                <strong>Medical Advice Notice</strong>
                This medicine is sold by prescription only. Consult your doctor before purchase. Keep out of reach of children.
              </div>
            </div>
          </div>
        </div>

        {/* INFO STRIP */}
        <div className="pd-info-strip">
          {[
            ["🚚", "Free Delivery", "Orders above ₹299. Same-day dispatch available"],
            ["🔄", "Easy Returns", "7-day hassle-free return on eligible items"],
            ["🛡️", "100% Genuine", "All medicines sourced directly from manufacturers"],
            ["💬", "24/7 Support", "Expert pharmacist helpline always available"],
          ].map(([icon, title, desc]) => (
            <div className="pd-info-card" key={title}>
              <div className="pd-info-card-icon">{icon}</div>
              <div className="pd-info-card-title">{title}</div>
              <div className="pd-info-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}