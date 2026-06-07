import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import CancelOrderModal from "./CancelOrderModal";
import ReturnRequestModal from "./ReturnRequestModal"; // return modal

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [returnOrder, setReturnOrder] = useState(null); // 🆕 store order for return
  const token = localStorage.getItem("access_token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://nthealthcarebackend.onrender.com/api/orders/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // ---------- Cancel ----------
  const handleCancelSuccess = () => {
    setCancelOrderId(null);
    fetchOrders();
  };

  // ---------- Return ----------
  const handleReturnSuccess = () => {
    setReturnOrder(null);
    fetchOrders();
    alert("Return request submitted! We'll review it shortly.");
  };

  // check return window (7 days)
  const canReturn = (order) => {
    if (!order.delivered_at) return false;
    const days = Math.floor((new Date() - new Date(order.delivered_at)) / (1000 * 60 * 60 * 24));
    return days <= 7;
  };

  const daysLeft = (order) => {
    if (!order.delivered_at) return 0;
    return Math.max(0, 7 - Math.floor((new Date() - new Date(order.delivered_at)) / (1000 * 60 * 60 * 24)));
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
                        <span className={`badge bg-${statusColors[order.status] || "secondary"}`}>
                          {order.status}
                        </span>
                        <p className="mt-1 mb-1">Total: ₹{order.total_amount}</p>
                        <small>{new Date(order.created_at).toLocaleDateString()}</small>

                        {/* Return countdown */}
                        {order.status === "DELIVERED" && canReturn(order) && (
                          <div className="mt-2">
                            <small className="text-success">
                              {daysLeft(order)} day{daysLeft(order) !== 1 ? "s" : ""} left to return
                            </small>
                          </div>
                        )}
                        {order.status === "DELIVERED" && !canReturn(order) && (
                          <div className="mt-2">
                            <small className="text-danger">Return window expired</small>
                          </div>
                        )}
                      </div>

                      <div className="text-end">
                        {/* Return button */}
                        {order.status === "DELIVERED" && canReturn(order) && (
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => setReturnOrder(order)}
                          >
                            Return
                          </button>
                        )}

                        {/* Cancel button */}
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

      {/* Cancel Modal */}
      {cancelOrderId && (
        <CancelOrderModal
          order={orders.find((o) => o.id === cancelOrderId)}
          onClose={() => setCancelOrderId(null)}
          onSuccess={handleCancelSuccess}
        />
      )}

      {/* Return Modal (no image inside) */}
      {returnOrder && (
        <ReturnRequestModal
          order={returnOrder}
          onClose={() => setReturnOrder(null)}
          onSuccess={handleReturnSuccess}
        />
      )}
    </>
  );
};

export default Orders;