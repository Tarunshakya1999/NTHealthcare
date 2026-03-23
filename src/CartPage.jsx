import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0f0e17;
    --surface: #1a1826;
    --card: #211f2e;
    --border: rgba(255,255,255,0.07);
    --accent: #ff6b35;
    --accent2: #f7c59f;
    --text: #fffffe;
    --muted: #a7a9be;
    --success: #2cb67d;
    --danger: #e63946;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cart-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  .cart-wrapper {
    max-width: 860px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .cart-header {
    margin-bottom: 36px;
  }

  .cart-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    background: linear-gradient(135deg, var(--text) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cart-header p {
    color: var(--muted);
    font-size: 0.9rem;
    margin-top: 4px;
  }

  /* ── EMPTY STATE ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    animation: fadeSlideUp 0.6s ease forwards;
  }

  .empty-cart-svg {
    width: 180px;
    height: 180px;
    margin-bottom: 32px;
    animation: floatCart 3s ease-in-out infinite;
  }

  @keyframes floatCart {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }

  .empty-state h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .empty-state p {
    color: var(--muted);
    font-size: 0.95rem;
    max-width: 300px;
    line-height: 1.6;
  }

  .shop-btn {
    display: inline-block;
    margin-top: 28px;
    padding: 12px 32px;
    background: var(--accent);
    color: #fff;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    font-size: 0.95rem;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(255,107,53,0.35);
  }

  .shop-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,107,53,0.5);
    color: #fff;
    text-decoration: none;
  }

  /* ── CART ITEMS ── */
  .cart-item {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fadeSlideUp 0.4s ease both;
  }

  .cart-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .item-img-wrap {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    background: #2a2838;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  .item-info { flex: 1; min-width: 0; }

  .item-name {
    font-weight: 600;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }

  .item-price {
    color: var(--accent2);
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 14px;
  }

  .qty-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .qty-control {
    display: flex;
    align-items: center;
    gap: 0;
    background: #2a2838;
    border-radius: 10px;
    overflow: hidden;
  }

  .qty-btn {
    width: 34px;
    height: 34px;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .qty-btn:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
  .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .qty-val {
    min-width: 32px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .spinner-sm {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .remove-btn {
    background: rgba(230,57,70,0.12);
    border: 1px solid rgba(230,57,70,0.25);
    color: var(--danger);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .remove-btn:hover { background: rgba(230,57,70,0.25); transform: scale(1.04); }
  .remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .buy-btn-sm {
    background: var(--success);
    border: none;
    color: #fff;
    border-radius: 8px;
    padding: 6px 16px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: background 0.2s, transform 0.15s;
  }
  .buy-btn-sm:hover { background: #25a370; transform: scale(1.04); color: #fff; text-decoration: none; }

  /* ── SUMMARY BAR ── */
  .summary-bar {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px 28px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    animation: fadeSlideUp 0.5s ease both;
  }

  .total-label { color: var(--muted); font-size: 0.85rem; margin-bottom: 2px; }
  .total-amt {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: var(--accent2);
  }

  .summary-actions { display: flex; gap: 12px; align-items: center; }

  .empty-cart-btn {
    background: transparent;
    border: 1px solid rgba(230,57,70,0.4);
    color: var(--danger);
    border-radius: 12px;
    padding: 11px 22px;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }
  .empty-cart-btn:hover { background: rgba(230,57,70,0.1); }

  .checkout-btn {
    background: linear-gradient(135deg, var(--accent) 0%, #ff9a5c 100%);
    border: none;
    color: #fff;
    border-radius: 12px;
    padding: 12px 28px;
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 20px rgba(255,107,53,0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .checkout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,107,53,0.5);
    color: #fff;
    text-decoration: none;
  }

  /* ── LOADING ── */
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .loader-ring {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(255,255,255,0.08);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* stagger items */
  .cart-item:nth-child(1) { animation-delay: 0.05s; }
  .cart-item:nth-child(2) { animation-delay: 0.1s; }
  .cart-item:nth-child(3) { animation-delay: 0.15s; }
  .cart-item:nth-child(4) { animation-delay: 0.2s; }
  .cart-item:nth-child(5) { animation-delay: 0.25s; }

  @media (max-width: 560px) {
    .cart-item { flex-direction: column; align-items: flex-start; }
    .item-img-wrap { width: 70px; height: 70px; }
    .summary-bar { flex-direction: column; align-items: flex-start; }
    .cart-header h2 { font-size: 1.8rem; }
    .total-amt { font-size: 1.5rem; }
  }
`;

// ── Animated Empty Cart SVG ──────────────────────────────────────────────────
const EmptyCartIllustration = () => (
  <svg
    className="empty-cart-svg"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cart body */}
    <path
      d="M40 60h130l-18 70H58L40 60Z"
      fill="#211f2e"
      stroke="#ff6b35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Cart handle */}
    <path
      d="M20 40h16l22 90"
      stroke="#ff6b35"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Wheels */}
    <circle cx="76" cy="148" r="10" fill="#1a1826" stroke="#ff6b35" strokeWidth="3" />
    <circle cx="138" cy="148" r="10" fill="#1a1826" stroke="#ff6b35" strokeWidth="3" />
    {/* X inside cart – empty indicator */}
    <line x1="88" y1="85" x2="118" y2="110" stroke="#a7a9be" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="118" y1="85" x2="88" y2="110" stroke="#a7a9be" strokeWidth="2.5" strokeLinecap="round" />
    {/* Stars / sparkles */}
    <circle cx="160" cy="50" r="3" fill="#f7c59f" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="45" r="2" fill="#ff6b35" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="170" cy="90" r="2.5" fill="#f7c59f" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// ── Main Component ───────────────────────────────────────────────────────────
export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const token = localStorage.getItem("access_token");

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://nthealthcarebackend.onrender.com/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (itemId, action) => {
    setUpdatingItemId(itemId);
    try {
      await axios.patch(
        `https://nthealthcarebackend.onrender.com/api/cart/update/${itemId}/`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removeItem = async (itemId) => {
    setUpdatingItemId(itemId);
    try {
      await axios.delete(`https://nthealthcarebackend.onrender.com/api/cart/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const emptyCart = async () => {
    setLoading(true);
    try {
      for (let item of cart) {
        await axios.delete(`https://nthealthcarebackend.onrender.com/api/cart/${item.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCart();
    } catch (err) {
      console.error("Failed to empty cart", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.product_price,
    0
  );

  return (
    <div className="cart-root">
      <style>{styles}</style>
      <Nav />

      <div className="cart-wrapper">
        <div className="cart-header">
          <h2>Your Cart</h2>
          {!loading && cart.length > 0 && (
            <p>{cart.length} item{cart.length !== 1 ? "s" : ""} waiting for you</p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-screen">
            <div className="loader-ring" />
            <span>Loading your cart…</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && cart.length === 0 && (
          <div className="empty-state">
            <EmptyCartIllustration />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet. Let's fix that!</p>
            <Link to="/" className="shop-btn">Start Shopping →</Link>
          </div>
        )}

        {/* Items */}
        {!loading && cart.length > 0 && (
          <>
            {cart.map((item, i) => (
              <div className="cart-item" key={item.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="item-img-wrap">
                  <img src={item.product_image} alt={item.product_name} />
                </div>

                <div className="item-info">
                  <div className="item-name">{item.product_name}</div>
                  <div className="item-price">
                    ₹{item.product_price} × {item.quantity} = <strong>₹{item.product_price * item.quantity}</strong>
                  </div>

                  <div className="qty-row">
                    {/* Qty control */}
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, "decrease")}
                        disabled={updatingItemId === item.id}
                      >−</button>
                      <span className="qty-val">
                        {updatingItemId === item.id
                          ? <span className="spinner-sm" />
                          : item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, "increase")}
                        disabled={updatingItemId === item.id}
                      >+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      disabled={updatingItemId === item.id}
                    >Remove</button>

                    <Link to="/payment" className="buy-btn-sm">⚡ Buy Now</Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary bar */}
            <div className="summary-bar">
              <div>
                <div className="total-label">Order Total</div>
                <div className="total-amt">₹{totalPrice.toLocaleString("en-IN")}</div>
              </div>
              <div className="summary-actions">
                <button className="empty-cart-btn" onClick={emptyCart}>
                  🗑 Empty Cart
                </button>
                <Link to="/payment" className="checkout-btn">
                  Checkout →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}