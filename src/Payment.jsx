import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import Nav from "./Nav";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const amount     = searchParams.get("amount") || "0";
  const mode       = searchParams.get("mode");
  const prodName   = searchParams.get("name");
  const qty        = searchParams.get("qty");
  const itemsParam = searchParams.get("items");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const cartItems = (() => {
    try { return itemsParam ? JSON.parse(decodeURIComponent(itemsParam)) : []; }
    catch { return []; }
  })();

  let orderItems = [];
  if (mode === "single") {
    orderItems = [{
      product_name: prodName ? decodeURIComponent(prodName) : "Product",
      quantity: qty || 1,
      product_price: amount / (qty || 1),
    }];
  } else {
    try { orderItems = JSON.parse(decodeURIComponent(itemsParam || "[]")); }
    catch {}
  }

  const UPI_ID     = "7011617976@ibl";
  const PAYEE_NAME = "NT Healthcare";
  const upiUrl     = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent("Payment to NT Healthcare")}`;

  const waMessage = useMemo(() => {
    if (mode === "single") {
      return (
        `Hello NT Healthcare!\n\n` +
        `I have completed the UPI payment.\n\n` +
        `*Order Details:*\n` +
        `• Product: ${decodeURIComponent(prodName || "")}\n` +
        `• Qty: ${qty || 1}\n` +
        `• Amount: ₹${Number(amount).toLocaleString("en-IN")}\n\n` +
        `I have attached the payment screenshot.\n\nThank you!`
      );
    }
    const itemLines = cartItems.length > 0
      ? cartItems.map((item, i) => {
          const lineTotal = item.price
            ? ` × ₹${Number(item.price).toLocaleString("en-IN")} = ₹${(item.qty * item.price).toLocaleString("en-IN")}`
            : "";
          return `${i + 1}. ${item.name} — Qty: ${item.qty}${lineTotal}`;
        }).join("\n")
      : "All cart items";
    return (
      `Hello NT Healthcare!\n\n` +
      `I have completed the UPI payment for my cart order.\n\n` +
      `*Order Summary:*\n${itemLines}\n\n` +
      `*Total Paid: ₹${Number(amount).toLocaleString("en-IN")}*\n\n` +
      `I have attached the payment screenshot.\n\nThank you!`
    );
  }, [mode, prodName, qty, amount, cartItems]);

  const [form, setForm] = useState({
    transaction_id: "",
    payment_screenshot: null,
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied]         = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "payment_screenshot") {
      setForm({ ...form, payment_screenshot: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    fd.append("total_amount", amount);
    fd.append("transaction_id", form.transaction_id);
    if (form.payment_screenshot) fd.append("payment_screenshot", form.payment_screenshot);
    fd.append("address_line1", form.address_line1);
    fd.append("address_line2", form.address_line2);
    fd.append("city", form.city);
    fd.append("state", form.state);
    fd.append("pincode", form.pincode);
    fd.append("landmark", form.landmark);
    fd.append("phone", form.phone);
    fd.append("items", JSON.stringify(orderItems));
    if (mode === "all") fd.append("empty_cart", "true");

    try {
      await axios.post(
        "https://nthealthcarebackend.onrender.com/api/orders/",
        fd,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Order submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --teal: #0a7e7e;
          --teal-light: #12a5a5;
          --teal-pale: #e6f7f7;
          --teal-mid: #c2ecec;
          --navy: #0d2b45;
          --muted: #6b8a9a;
          --bg: #f3fafa;
          --green: #16a34a;
          --green-pale: #f0fdf4;
          --green-border: #bbf7d0;
          --orange: #e07b39;
          --orange-pale: #fff4eb;
          --orange-border: #fcd8b7;
        }

        .pp-page {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem 4rem;
        }

        .pp-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== STEPPER BANNER ===== */
        .pp-stepper {
          background: #fff;
          border: 1.5px solid var(--teal-mid);
          border-radius: 20px;
          padding: 24px 20px;
          margin-bottom: 28px;
          box-shadow: 0 8px 32px rgba(10,126,126,0.09);
        }
        .pp-stepper h2 {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 1.3rem;
          color: var(--navy);
          margin-bottom: 4px;
          text-align: center;
        }
        .pp-stepper .pp-subhead {
          text-align: center;
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .pp-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pp-step-card {
          background: var(--teal-pale);
          border: 1.5px solid var(--teal-mid);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          transition: transform 0.15s;
        }
        .pp-step-card:hover { transform: translateY(-2px); }
        .pp-step-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }
        .pp-step-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .pp-step-desc {
          font-size: 0.72rem;
          color: var(--muted);
          line-height: 1.4;
        }

        /* ===== TWO COLUMN LAYOUT ===== */
        .pp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        /* ===== CARDS ===== */
        .pp-card {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid var(--teal-mid);
          box-shadow: 0 8px 32px rgba(10,126,126,0.09);
          overflow: hidden;
        }

        .pp-section-header {
          background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pp-section-num {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Nunito', sans-serif;
          font-weight: 900; font-size: 0.85rem; color: #fff;
          flex-shrink: 0;
        }
        .pp-section-title {
          font-family: 'Nunito', sans-serif;
          font-weight: 800; font-size: 1rem; color: #fff;
        }
        .pp-section-body { padding: 20px; }

        .pp-brand {
          text-align: center;
          padding: 22px 20px 16px;
          border-bottom: 1.5px solid var(--teal-mid);
        }
        .pp-brand-logo {
          width: 64px; height: 64px;
          border-radius: 50%; object-fit: cover;
          border: 3px solid var(--teal-mid);
          margin: 0 auto 10px; display: block;
          box-shadow: 0 4px 14px rgba(10,126,126,0.18);
        }
        .pp-brand h1 {
          font-family: 'Nunito', sans-serif;
          font-size: 1.3rem; font-weight: 900; color: var(--navy);
          margin-bottom: 2px;
        }
        .pp-brand p { font-size: 0.78rem; color: var(--muted); }

        .pp-order-badge {
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.8px;
          padding: 5px 12px; border-radius: 50px;
          margin: 14px auto 16px;
          display: flex; align-items: center; gap: 5px;
          width: fit-content;
        }
        .badge-green { background: var(--green-pale); color: var(--green); border: 1.5px solid var(--green-border); }
        .badge-amber { background: #fffbeb; color: #d97706; border: 1.5px solid #fde68a; }

        .pp-items-box {
          background: var(--teal-pale);
          border: 1.5px solid var(--teal-mid);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .pp-item-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid var(--teal-mid);
        }
        .pp-item-row:last-child { border-bottom: none; }
        .pp-item-name { font-size: 0.87rem; font-weight: 600; color: var(--navy); }
        .pp-item-sub  { font-size: 0.72rem; color: var(--muted); margin-top: 1px; }
        .pp-qty-pill {
          background: #eff6ff; color: #2563eb;
          border: 1px solid #bfdbfe;
          border-radius: 6px; font-size: 0.72rem; font-weight: 700;
          padding: 3px 10px; white-space: nowrap;
        }
        .pp-items-footer {
          background: var(--teal-mid);
          padding: 7px 14px;
          display: flex; justify-content: flex-end;
          font-size: 0.72rem; font-weight: 700; color: var(--teal);
        }

        .pp-qr-center {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .pp-qr-wrap {
          padding: 14px;
          background: #fff;
          border: 2px solid var(--teal-mid);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(10,126,126,0.12);
        }
        .pp-qr-hint { font-size: 0.76rem; color: var(--muted); font-weight: 500; }

        .pp-amount-card {
          background: var(--green-pale);
          border: 1.5px solid var(--green-border);
          border-radius: 14px;
          padding: 14px;
          text-align: center;
          margin-bottom: 14px;
        }
        .pp-amount-label {
          display: block; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 1.2px;
          color: var(--green); margin-bottom: 3px; font-weight: 700;
        }
        .pp-amount-value {
          font-family: 'Nunito', sans-serif;
          font-size: 2.2rem; font-weight: 900; color: #15803d;
        }

        .pp-upi-row {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--teal-pale); border: 1.5px solid var(--teal-mid);
          border-radius: 12px; padding: 10px 14px; margin-bottom: 16px;
        }
        .pp-upi-label {
          font-size: 0.65rem; color: var(--muted);
          text-transform: uppercase; letter-spacing: 0.8px;
          margin-bottom: 2px; font-weight: 700;
        }
        .pp-upi-value { font-size: 0.88rem; font-weight: 700; color: var(--navy); }
        .pp-copy-btn {
          font-size: 0.75rem; font-weight: 700;
          padding: 6px 14px; border-radius: 8px;
          border: 1.5px solid var(--teal-mid);
          background: #fff; color: var(--teal);
          cursor: pointer; transition: all 0.15s;
        }
        .pp-copy-btn:hover { background: var(--teal); color: #fff; }

        .pp-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 14px;
          border-radius: 14px; text-decoration: none;
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem; font-weight: 800;
          transition: all 0.18s; border: none; cursor: pointer;
          margin-bottom: 10px;
        }
        .pp-btn:last-child { margin-bottom: 0; }
        .pp-btn-upi {
          background: linear-gradient(135deg, var(--teal), var(--teal-light));
          color: #fff; box-shadow: 0 4px 16px rgba(10,126,126,0.3);
        }
        .pp-btn-upi:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(10,126,126,0.4); }
        .pp-btn-wa { background: #25d366; color: #fff; box-shadow: 0 4px 16px rgba(37,211,102,0.3); }
        .pp-btn-wa:hover { transform: translateY(-2px); background: #22c55e; }

        .pp-steps { display: flex; flex-direction: column; gap: 12px; }
        .pp-step  { display: flex; align-items: flex-start; gap: 12px; }
        .pp-step-num {
          width: 26px; height: 26px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--teal), var(--teal-light));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Nunito', sans-serif;
          font-size: 0.78rem; font-weight: 900; color: #fff;
        }
        .pp-step-text { font-size: 0.83rem; line-height: 1.45; color: var(--navy); padding-top: 2px; }
        .pp-hindi { display: block; font-size: 0.75rem; color: var(--muted); margin-top: 1px; }

        .pp-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 4px 0 16px;
        }
        .pp-divider span { font-size: 0.7rem; color: var(--muted); white-space: nowrap; font-weight: 600; }
        .pp-divider::before, .pp-divider::after {
          content: ''; flex: 1; height: 1.5px; background: var(--teal-mid);
        }

        .pp-form-group { margin-bottom: 14px; }
        .pp-label {
          display: block; font-size: 0.78rem; font-weight: 700;
          color: var(--navy); margin-bottom: 6px;
        }
        .pp-label span { color: #e74c3c; margin-left: 2px; }
        .pp-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid var(--teal-mid);
          border-radius: 12px;
          font-size: 0.87rem; color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          background: var(--teal-pale);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .pp-input:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(10,126,126,0.12);
          background: #fff;
        }
        .pp-input::placeholder { color: var(--muted); }
        .pp-input[type="file"] { padding: 8px 12px; cursor: pointer; }

        .pp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .pp-file-hint {
          font-size: 0.72rem; color: var(--muted);
          margin-top: 5px; display: flex; align-items: center; gap: 4px;
        }

        .pp-submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, var(--teal), var(--teal-light));
          color: #fff; border: none; border-radius: 14px;
          font-family: 'Nunito', sans-serif;
          font-size: 1rem; font-weight: 900;
          cursor: pointer; margin-top: 8px;
          box-shadow: 0 6px 24px rgba(10,126,126,0.3);
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pp-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(10,126,126,0.4);
        }
        .pp-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .pp-secure {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 0.7rem; color: #b0c4ce; margin-top: 14px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .pp-grid { grid-template-columns: 1fr; }
          .pp-steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .pp-steps-grid { grid-template-columns: 1fr; }
          .pp-row { grid-template-columns: 1fr; }
          .pp-amount-value { font-size: 1.8rem; }
        }
      `}</style>

      <div className="pp-page">
        <div className="pp-wrapper">

          {/* ========== STEPPER BANNER ========== */}
          <div className="pp-stepper">
            <h2>How to complete your order? 📋</h2>
            <p className="pp-subhead">Follow these simple steps to pay and confirm your purchase</p>
            <div className="pp-steps-grid">
              <div className="pp-step-card">
                <div className="pp-step-icon">📱</div>
                <div className="pp-step-title">1. Scan QR or use UPI</div>
                <div className="pp-step-desc">Scan the QR code or tap "Pay with UPI App"</div>
              </div>
              <div className="pp-step-card">
                <div className="pp-step-icon">📸</div>
                <div className="pp-step-title">2. Take Payment Screenshot</div>
                <div className="pp-step-desc">After payment, Send Screenshot On Whatsapp</div>
              </div>
              <div className="pp-step-card">
                <div className="pp-step-icon">📝</div>
                <div className="pp-step-title">3. Fill Details</div>
                <div className="pp-step-desc">Enter address, transaction ID, upload screenshot</div>
              </div>
              <div className="pp-step-card">
                <div className="pp-step-icon">✅</div>
                <div className="pp-step-title">4. Confirm Order</div>
                <div className="pp-step-desc">Click "Place Order" — your order will be processed</div>
              </div>
            </div>
          </div>

          {/* ========== TWO-COLUMN CONTENT ========== */}
          <div className="pp-grid">

            {/* ══ LEFT CARD: PAYMENT ══ */}
            <div className="pp-card">

              {/* Brand */}
              <div className="pp-brand">
                <img src="/pwa-192x192.jpeg" alt="NT Healthcare" className="pp-brand-logo" />
                <h1>NT Healthcare</h1>
                <p>Secure UPI Payment · Zeeva Pharmaceuticals</p>
              </div>

              <div className="pp-section-body">
                {/* Order badge */}
                <div className={`pp-order-badge ${mode === "single" ? "badge-green" : "badge-amber"}`}>
                  {mode === "single" ? "⚡ Buying Now" : "🛒 Cart Checkout"}
                </div>

                {/* Items summary */}
                <div className="pp-items-box">
                  {mode === "single" ? (
                    <div className="pp-item-row">
                      <div>
                        <div className="pp-item-name">
                          {prodName ? decodeURIComponent(prodName) : "Product"}
                        </div>
                        <div className="pp-item-sub">Zeeva Pharmaceuticals</div>
                      </div>
                      {qty && <span className="pp-qty-pill">Qty: {qty}</span>}
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item, i) => (
                        <div className="pp-item-row" key={i}>
                          <div>
                            <div className="pp-item-name">{item.name}</div>
                            {item.price && (
                              <div className="pp-item-sub">
                                ₹{Number(item.price).toLocaleString("en-IN")} each
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span className="pp-qty-pill">Qty: {item.qty}</span>
                            {item.price && (
                              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--navy)", marginTop: 4 }}>
                                ₹{(item.qty * item.price).toLocaleString("en-IN")}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {cartItems.length > 0 && (
                        <div className="pp-items-footer">
                          {cartItems.reduce((s, i) => s + i.qty, 0)} items total
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* QR Code */}
                <div className="pp-qr-center">
                  <div className="pp-qr-wrap">
                    <QRCodeSVG
                      value={upiUrl}
                      size={160}
                      level="H"
                      includeMargin={false}
                      bgColor="#ffffff"
                      fgColor="#0d2b45"
                    />
                  </div>
                  <span className="pp-qr-hint">📱 Scan with any UPI app — GPay, PhonePe, Paytm</span>
                </div>

                {/* Amount */}
                <div className="pp-amount-card">
                  <span className="pp-amount-label">Total Amount to Pay</span>
                  <div className="pp-amount-value">₹{Number(amount).toLocaleString("en-IN")}</div>
                </div>

                {/* UPI ID */}
                <div className="pp-upi-row">
                  <div>
                    <div className="pp-upi-label">UPI ID</div>
                    <div className="pp-upi-value">{UPI_ID}</div>
                  </div>
                  <button className="pp-copy-btn" onClick={handleCopy}>
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                {/* Pay with UPI button */}
                <a href={upiUrl} className="pp-btn pp-btn-upi">
                  📲 Pay ₹{Number(amount).toLocaleString("en-IN")} with UPI App
                </a>

                {/* WhatsApp button */}
                <div className="pp-divider" style={{ marginTop: 20 }}>
                  <span>also send screenshot / स्क्रीनशॉट भेजें</span>
                </div>

                <a
                  href={`https://wa.me/917011617976?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-btn pp-btn-wa"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send Screenshot on WhatsApp 
                </a>

                <p className="pp-secure">🔒 256-bit encrypted · Powered by NPCI UPI</p>
              </div>
            </div>

            {/* ══ RIGHT CARD: ORDER FORM ══ */}
            <div className="pp-card">
              <div className="pp-section-header">
                <div className="pp-section-num">2</div>
                <div className="pp-section-title">
                  Confirm Order Details / ऑर्डर की जानकारी भरें
                </div>
              </div>

              <div className="pp-section-body">
                {/* Order summary */}
                <div className="pp-items-box" style={{ marginBottom: 20 }}>
                  {orderItems.map((item, idx) => (
                    <div className="pp-item-row" key={idx}>
                      <div className="pp-item-name">{item.product_name}</div>
                      <span className="pp-qty-pill">×{item.quantity}</span>
                    </div>
                  ))}
                  <div className="pp-items-footer">
                    Total: ₹{Number(amount).toLocaleString("en-IN")}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Payment proof */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{
                      fontSize: "0.78rem", fontWeight: 800, color: "var(--teal)",
                      textTransform: "uppercase", letterSpacing: "0.8px",
                      marginBottom: 12, display: "flex", alignItems: "center", gap: 6,
                    }}>
                      💳 Payment Proof
                    </div>

                    <div className="pp-form-group">
                      <label className="pp-label">
                        Transaction ID / UTR Number <span>*</span>
                      </label>
                      <input
                        className="pp-input"
                        name="transaction_id"
                        value={form.transaction_id}
                        onChange={handleChange}
                        placeholder="e.g. 423891762345"
                        required
                      />
                    </div>

                    <div className="pp-form-group">
                      <label className="pp-label">
                        Payment Screenshot <span>*</span>
                      </label>
                      <input
                        type="file"
                        className="pp-input"
                        name="payment_screenshot"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />
                      <div className="pp-file-hint">
                        📷 Upload screenshot from your UPI app
                      </div>
                    </div>
                  </div>

                  <div className="pp-divider">
                    <span>Shipping Address / डिलीवरी पता</span>
                  </div>

                  {/* Address fields */}
                  <div style={{ marginBottom: 20 }}>
                    <div className="pp-form-group">
                      <label className="pp-label">House / Flat No. <span>*</span></label>
                      <input
                        className="pp-input"
                        name="address_line1"
                        value={form.address_line1}
                        onChange={handleChange}
                        placeholder="e.g. B-204, Krishna Apartments"
                        required
                      />
                    </div>

                    <div className="pp-form-group">
                      <label className="pp-label">Street / Area / Colony</label>
                      <input
                        className="pp-input"
                        name="address_line2"
                        value={form.address_line2}
                        onChange={handleChange}
                        placeholder="e.g. Sector 12, Dwarka"
                      />
                    </div>

                    <div className="pp-row">
                      <div className="pp-form-group">
                        <label className="pp-label">City <span>*</span></label>
                        <input
                          className="pp-input"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="e.g. Delhi"
                          required
                        />
                      </div>
                      <div className="pp-form-group">
                        <label className="pp-label">State <span>*</span></label>
                        <input
                          className="pp-input"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          placeholder="e.g. Delhi"
                          required
                        />
                      </div>
                    </div>

                    <div className="pp-row">
                      <div className="pp-form-group">
                        <label className="pp-label">Pincode <span>*</span></label>
                        <input
                          className="pp-input"
                          name="pincode"
                          value={form.pincode}
                          onChange={handleChange}
                          placeholder="e.g. 110075"
                          required
                        />
                      </div>
                      <div className="pp-form-group">
                        <label className="pp-label">Landmark</label>
                        <input
                          className="pp-input"
                          name="landmark"
                          value={form.landmark}
                          onChange={handleChange}
                          placeholder="e.g. Near Metro"
                        />
                      </div>
                    </div>

                    <div className="pp-form-group">
                      <label className="pp-label">Phone Number <span>*</span></label>
                      <input
                        className="pp-input"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="pp-submit-btn" disabled={submitting}>
                    {submitting ? "⏳ Submitting..." : "✅ Confirm & Place Order"}
                  </button>
                </form>

                <p className="pp-secure" style={{ marginTop: 12 }}>
                  🛡️ Your data is safe and encrypted
                </p>
              </div>
            </div>

          </div> {/* / pp-grid */}

        </div>
      </div>
    </>
  );
};

export default PaymentPage;