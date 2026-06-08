import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import CancelOrderModal from "./CancelOrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const token = localStorage.getItem("access_token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://nthealthcarebackend.onrender.com/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelSuccess = () => {
    setCancelOrderId(null);
    fetchOrders();
  };

  // ✅ WhatsApp return handler
  const handleReturn = (order) => {
    // Build the message
    let message = `*RETURN REQUEST* 🚚\n`;
    message += `Order ID: #${order.id}\n`;
    message += `Order Date: ${new Date(order.created_at).toLocaleDateString()}\n\n`;
    message += `*Products to Return:*\n`;
    order.items.forEach((item) => {
      const itemTotal = item.product_price * item.quantity;
      message += `➤ ${item.product_name}\n   Quantity: ${item.quantity} × ₹${item.product_price} = ₹${itemTotal}\n`;
    });
    message += `\n*Total Amount:* ₹${order.total_amount}\n`;
    message += `\n*Reason for return:* \n`;  // user can type after this
    message += `\n⚠️ *Note:* Return is accepted only within 7 days of delivery.`;

    // WhatsApp link with pre-filled message
    const whatsappNumber = "917011617976"; // 7011617976 with India country code
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const statusColors = {
    PENDING: "secondary",
    VERIFIED: "info",
    PROCESSING: "warning",
    SHIPPED: "primary",
    DELIVERED: "success",
    CANCELLED: "danger",
    RETURN_REQUESTED: "warning",
    RETURNED: "dark",
    CANCELLATION_REQUESTED: "warning",
  };

  return (
    <>
      <Nav />
      <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "2rem" }}>
        <div className="container">
          <h2 className="mb-4">My Orders</h2>

          {/* ✅ 7‑day return policy notice */}
          <div className="alert alert-info mb-4" role="alert">
            📦 <strong>Return Policy:</strong> Orders can be returned only within <strong>7 days</strong> of delivery. After that, returns are not accepted.
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-center">
              <p>No orders yet.</p>
              <Link to="/" className="btn btn-primary">Shop Now</Link>
            </div>
          ) : (
            <div className="row g-3">
              {orders.map((order) => (
                <div className="col-12" key={order.id}>
                  <div className="card shadow-sm p-3 rounded-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6>Order #{order.id}</h6>
                        <span className={`badge bg-${statusColors[order.status] || "secondary"}`}>{order.status}</span>
                        <p className="mt-1 mb-1">Total: ₹{order.total_amount}</p>
                        <small>{new Date(order.created_at).toLocaleDateString()}</small>
                      </div>
                      <div className="text-end">
                        {order.status === "DELIVERED" && (
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => handleReturn(order)}  // ✅ pass whole order
                          >
                            Return
                          </button>
                        )}
                        {["PENDING", "VERIFIED", "PROCESSING"].includes(order.status) && (
                          <button
                            className="btn btn-sm btn-outline-danger me-2"
                            onClick={() => setCancelOrderId(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                        {order.status === "CANCELLATION_REQUESTED" && (
                          <span className="badge bg-warning text-dark">Cancellation Pending</span>
                        )}
                        <Link to="/" className="btn btn-sm btn-outline-primary">Shop More</Link>
                      </div>
                    </div>
                    <div className="mt-2">
                      {order.items?.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between small">
                          <span>{item.product_name} x {item.quantity}</span>
                          <span>₹{item.product_price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal (unchanged) */}
      {cancelOrderId && (
        <CancelOrderModal
          order={orders.find(o => o.id === cancelOrderId)}
          onClose={() => setCancelOrderId(null)}
          onSuccess={handleCancelSuccess}
        />
      )}
    </>
  );
};

export default Orders;