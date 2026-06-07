import React, { useState } from "react";
import axios from "axios";

const CancelOrderModal = ({ order, onClose, onSuccess }) => {
  const token = localStorage.getItem("access_token");
  const [form, setForm] = useState({
    reason_type: "",
    custom_reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reason_type) {
      setError("Please select a reason");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await axios.post(
        `https://nthealthcarebackend.onrender.com/api/orders/${order.id}/cancel/`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
    } catch (err) {
      const msg =
        err.response?.data?.error || "Failed to submit cancellation request";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const firstItem = order.items?.[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content animated"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3 className="modal-title">Cancel Order</h3>
        <p className="modal-subtitle">
          You are about to request cancellation of Order #{order.id}
        </p>

        {/* Product image + info */}
        {firstItem && (
          <div className="item-summary">
            <img
              src={firstItem.product_image || "/placeholder.png"}
              alt={firstItem.product_name}
              className="item-img"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
            <div className="item-info">
              <div className="item-name">{firstItem.product_name}</div>
              <div className="item-meta">Qty: {firstItem.quantity}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reason for cancellation *</label>
            <select
              name="reason_type"
              value={form.reason_type}
              onChange={handleChange}
              required
            >
              <option value="">Select reason</option>
              <option value="NOT_REQUIRED">Not Required Now</option>
              <option value="CHEAPER_ELSEWHERE">Found Cheaper Elsewhere</option>
              <option value="MISTAKE">Order Created by Mistake</option>
              <option value="LONG_DELIVERY">Delivery Time Too Long</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {form.reason_type === "OTHER" && (
            <div className="form-group">
              <label>Please explain</label>
              <textarea
                name="custom_reason"
                value={form.custom_reason}
                onChange={handleChange}
                rows="3"
              />
            </div>
          )}

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={order.user_name || localStorage.getItem("username") || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Order Total</label>
            <input type="text" value={`₹${order.total_amount}`} readOnly />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Confirm Cancel Order"}
          </button>
        </form>

        <div className="note">
          ⚠️ Your order will be cancelled once the admin approves the request.
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex;
          align-items: center; justify-content: center; z-index: 9999;
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          background: #fff; border-radius: 20px; padding: 2rem; width: 90%; max-width: 500px;
          max-height: 90vh; overflow-y: auto; position: relative;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .modal-close {
          position: absolute; top: 12px; right: 16px; background: none;
          border: none; font-size: 1.5rem; cursor: pointer; color: #666;
        }
        .modal-title { margin: 0 0 0.3rem; font-size: 1.5rem; color: #0f172a; }
        .modal-subtitle { font-size: 0.85rem; color: #475569; margin-bottom: 1.5rem; }

        /* Item summary with image */
        .item-summary {
          display: flex; gap: 12px; background: #f1f5f9; border-radius: 12px;
          padding: 12px; margin-bottom: 1.5rem; align-items: center;
        }
        .item-img {
          width: 60px; height: 60px; object-fit: contain; border-radius: 8px;
          background: #e2e8f0; /* subtle background while loading */
        }
        .item-name { font-weight: 700; color: #0f172a; }
        .item-meta { font-size: 0.8rem; color: #64748b; margin-top: 2px; }

        .form-group { margin-bottom: 1rem; }
        .form-group label {
          display: block; font-size: 0.85rem; font-weight: 600;
          color: #334155; margin-bottom: 0.3rem;
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; padding: 0.7rem 1rem; border: 1px solid #cbd5e1;
          border-radius: 10px; font-size: 0.9rem; color: #0f172a;
          background: #f8fafc; outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #f97316; box-shadow: 0 0 0 2px rgba(249,115,22,0.2);
        }
        .submit-btn {
          width: 100%; padding: 0.9rem; background: linear-gradient(135deg, #f97316, #ea580c);
          color: #fff; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem;
          cursor: pointer; margin-top: 0.5rem; transition: transform 0.1s;
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-msg { color: #dc2626; font-size: 0.85rem; margin-bottom: 0.5rem; }
        .note { margin-top: 1rem; font-size: 0.75rem; color: #94a3b8; text-align: center; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default CancelOrderModal;