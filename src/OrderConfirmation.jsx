import React, { useState } from "react";
import Nav from "./Nav";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // URL params se data
  const amount = searchParams.get("amount") || "0";
  const mode = searchParams.get("mode");          // "single" or "all"
  const prodName = searchParams.get("name");
  const qty = searchParams.get("qty");
  const itemsParam = searchParams.get("items");   // cart items JSON

  // Derive items array
  let orderItems = [];
  if (mode === "single") {
    orderItems = [
      {
        product_name: prodName ? decodeURIComponent(prodName) : "Product",
        quantity: qty || 1,
        product_price: amount / (qty || 1), // approximate
        product_image: "", // can't know here, but backend can fill later if product_id exists
      },
    ];
  } else {
    try {
      orderItems = JSON.parse(decodeURIComponent(itemsParam || "[]"));
    } catch {}
  }

  // Form state
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
      await axios.post("https://nthealthcarebackend.onrender.com/api/orders/", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Order submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "2rem" }}>
        <div className="container" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="mb-4">Confirm Your Order</h2>
          <div className="card p-4 shadow-sm rounded-3">
            <h5>Order Summary</h5>
            <p>Mode: {mode === "single" ? "Single Product" : "Full Cart"}</p>
            <ul>
              {orderItems.map((item, idx) => (
                <li key={idx}>{item.product_name} x {item.quantity}</li>
              ))}
            </ul>
            <p><strong>Total: ₹{amount}</strong></p>

            <form onSubmit={handleSubmit}>
              <h5 className="mt-4">Payment Details</h5>
              <div className="mb-3">
                <label>Transaction ID / UTR</label>
                <input className="form-control" name="transaction_id" value={form.transaction_id} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Payment Screenshot</label>
                <input type="file" className="form-control" name="payment_screenshot" accept="image/*" onChange={handleChange} required />
              </div>

              <h5 className="mt-4">Shipping Address</h5>
              <div className="row g-2">
                <div className="col-12">
                  <input className="form-control" placeholder="House/Flat No." name="address_line1" value={form.address_line1} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <input className="form-control" placeholder="Street/Area" name="address_line2" value={form.address_line2} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <input className="form-control" placeholder="City" name="city" value={form.city} onChange={handleChange} required />
                </div>
                <div className="col-6">
                  <input className="form-control" placeholder="State" name="state" value={form.state} onChange={handleChange} required />
                </div>
                <div className="col-6">
                  <input className="form-control" placeholder="Pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
                </div>
                <div className="col-6">
                  <input className="form-control" placeholder="Landmark" name="landmark" value={form.landmark} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <input className="form-control" placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-4" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;