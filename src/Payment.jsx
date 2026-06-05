import React from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import Nav from "./Nav";

const PaymentQR = () => {
  const [searchParams] = useSearchParams();
  const amount   = searchParams.get("amount") || "0";
  const mode     = searchParams.get("mode");
  const prodName = searchParams.get("name");
  const qty      = searchParams.get("qty");

  const UPI_ID     = "7011617976@ibl";
  const PAYEE_NAME = "NT Healthcare";

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent("Payment to NT Healthcare")}`;

  const waMessage = mode === "single"
    ? `Hello NT Healthcare! I have completed payment of ₹${amount} for ${decodeURIComponent(prodName || "")} (Qty: ${qty || 0}). Here is my screenshot.`
    : `Hello NT Healthcare! I have completed payment of ₹${amount} for my cart order. Here is my screenshot.`;

  const handleCopy = (e) => {
    navigator.clipboard.writeText(UPI_ID);
    e.target.textContent = "Copied ✓";
    setTimeout(() => { e.target.textContent = "Copy"; }, 2000);
  };

  return (
    <>
      <Nav />
      <div className="pay-page">
        <div className="pay-card">

          {/* Brand header */}
          <div className="pay-header">
            <img src="/pwa-192x192.jpeg" alt="NT Healthcare logo" className="brand-logo" />
            <h1>NT Healthcare</h1>
            <p>Secure UPI Payment</p>
          </div>

          {/* Order badge + item row */}
          <span className={`pay-badge ${mode === "single" ? "badge-green" : "badge-amber"}`}>
            {mode === "single" ? "⚡ Buying now" : "🛒 Cart checkout"}
          </span>

          <div className="item-row">
            <div className="item-info">
              <div className="item-name">
                {mode === "single" && prodName
                  ? decodeURIComponent(prodName)
                  : "All cart items"}
              </div>
              {mode === "single" && qty && (
                <div className="item-meta">Product · {qty} {qty === "1" ? "unit" : "units"}</div>
              )}
            </div>
            {mode === "single" && qty && (
              <span className="qty-pill">Qty: {qty}</span>
            )}
          </div>

          {/* QR Code */}
          <div className="qr-section">
            <div className="qr-wrap">
              <QRCodeSVG
                value={upiUrl}
                size={160}
                level="H"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#1e293b"
              />
            </div>
            <p className="qr-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: 4}}>
                <polyline points="1 8 1 1 8 1"/><line x1="1" y1="1" x2="9" y2="9"/>
                <polyline points="23 8 23 1 16 1"/><line x1="15" y1="9" x2="23" y2="1"/>
                <polyline points="1 16 1 23 8 23"/><line x1="1" y1="23" x2="9" y2="15"/>
                <polyline points="23 16 23 23 16 23"/><line x1="15" y1="15" x2="23" y2="23"/>
              </svg>
              Scan with any UPI app
            </p>
          </div>

          {/* Amount */}
          <div className="amount-card">
            <span className="amount-label">Total amount</span>
            <span className="amount-value">₹{Number(amount).toLocaleString("en-IN")}</span>
          </div>

          {/* UPI ID row */}
          <div className="upi-row">
            <div>
              <div className="upi-label">UPI ID</div>
              <div className="upi-value">{UPI_ID}</div>
            </div>
            <button className="copy-btn" onClick={handleCopy}>Copy</button>
          </div>

          {/* Primary action */}
          <a href={upiUrl} className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            Pay ₹{Number(amount).toLocaleString("en-IN")} with UPI App
          </a>

          {/* Divider */}
          <div className="divider"><span>after payment</span></div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/917011617976?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send screenshot on WhatsApp
          </a>

          {/* Security note */}
          <p className="secure-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            256-bit encrypted · Powered by NPCI UPI
          </p>
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }

        .pay-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 1.5rem;
        }

        .pay-card {
          background: #ffffff;
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 2rem 1.75rem 1.75rem;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        /* Header */
        .pay-header { margin-bottom: 1.25rem; }
        .brand-logo {
          width: 64px; height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
          margin: 0 auto 0.75rem;
          display: block;
        }
        .pay-header h1 {
          font-size: 1.35rem; font-weight: 700;
          color: #0f172a; margin-bottom: 2px;
        }
        .pay-header p { font-size: 0.8rem; color: #64748b; }

        /* Badge */
        .pay-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.7rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.8px;
          padding: 4px 10px; border-radius: 6px;
          margin-bottom: 1rem;
        }
        .badge-green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .badge-amber { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }

        /* Item row */
        .item-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; justify-content: space-between;
          text-align: left;
        }
        .item-name { font-size: 0.9rem; font-weight: 600; color: #0f172a; }
        .item-meta { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
        .qty-pill {
          background: #eff6ff; color: #2563eb;
          border: 1px solid #bfdbfe;
          border-radius: 6px; font-size: 0.75rem; font-weight: 600;
          padding: 3px 10px; white-space: nowrap;
        }

        /* QR */
        .qr-section { margin-bottom: 1.25rem; }
        .qr-wrap {
          display: inline-flex; padding: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          margin-bottom: 0.5rem;
        }
        .qr-label { font-size: 0.75rem; color: #94a3b8; }

        /* Amount */
        .amount-card {
          background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 12px; padding: 0.9rem;
          margin-bottom: 1rem;
        }
        .amount-label {
          display: block; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 1.2px;
          color: #16a34a; margin-bottom: 4px;
        }
        .amount-value { font-size: 2rem; font-weight: 700; color: #15803d; }

        /* UPI row */
        .upi-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 0.6rem 0.9rem;
          margin-bottom: 1rem; text-align: left;
        }
        .upi-label { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px; }
        .upi-value { font-size: 0.85rem; font-weight: 600; color: #0f172a; }
        .copy-btn {
          font-size: 0.75rem; font-weight: 600;
          padding: 4px 12px; border-radius: 6px;
          border: 1px solid #cbd5e1; background: #fff;
          color: #475569; cursor: pointer;
          transition: background 0.15s;
        }
        .copy-btn:hover { background: #f1f5f9; }

        /* Buttons */
        .btn-primary, .btn-whatsapp {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 0.8rem;
          border-radius: 12px; text-decoration: none;
          font-size: 0.9rem; font-weight: 600;
          transition: opacity 0.15s, transform 0.1s;
        }
        .btn-primary:active, .btn-whatsapp:active { transform: scale(0.98); }
        .btn-primary {
          background: #2563eb; color: #fff;
          margin-bottom: 0.6rem;
        }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-whatsapp { background: #25d366; color: #fff; }
        .btn-whatsapp:hover { background: #22c55e; }

        /* Divider */
        .divider {
          display: flex; align-items: center; gap: 8px;
          margin: 0.5rem 0 0.75rem;
        }
        .divider span { font-size: 0.7rem; color: #cbd5e1; white-space: nowrap; }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: #f1f5f9;
        }

        /* Security note */
        .secure-note {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 0.7rem; color: #cbd5e1;
          margin-top: 1rem;
        }

        @media (max-width: 440px) {
          .pay-card { padding: 1.5rem 1.2rem; border-radius: 16px; }
          .amount-value { font-size: 1.75rem; }
        }
      `}</style>
    </>
  );
};

export default PaymentQR;