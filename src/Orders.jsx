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

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading orders...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Order #{order.id}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Total: ₹{order.total_amount}
                </p>

                <div className="flex gap-3 mt-3">
                  <Link
                    to={`/order/${order.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>

                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <button
                        onClick={() => setCancelOrderId(order.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cancelOrderId && (
        <CancelOrderModal
          orderId={cancelOrderId}
          onClose={() => setCancelOrderId(null)}
          onSuccess={handleCancelSuccess}
        />
      )}
    </>
  );
};

export default Orders;