// RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Refund Policy</h1>
        <p className="text-muted">
          We want you to be satisfied with your purchase. Please read our refund
          policy carefully.
        </p>
      </div>

      {/* Intro */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p>
            Our refund policy outlines the conditions under which refunds,
            returns, and exchanges are accepted. By placing an order, you agree
            to the terms below.
          </p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">✅ Eligibility for Refund</h4>
          <ul className="mt-2">
            <li>Product must be unused and in original packaging</li>
            <li>Return request must be made within 7 days of delivery</li>
            <li>Valid proof of purchase is required</li>
          </ul>
        </div>
      </div>

      {/* Non Refundable */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">❌ Non-Refundable Items</h4>
          <ul className="mt-2">
            <li>Opened or used health supplements</li>
            <li>Products damaged due to misuse</li>
            <li>Items purchased during special sales or clearance</li>
          </ul>
        </div>
      </div>

      {/* Damaged */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">📦 Damaged or Incorrect Products</h4>
          <p className="mt-2">
            If you receive a damaged or wrong product, please contact us within
            48 hours of delivery with photos or proof. We will arrange a
            replacement or refund.
          </p>
        </div>
      </div>

      {/* Process */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Refund Process</h4>
          <ul className="mt-2">
            <li>Submit a refund request through our support channel</li>
            <li>Our team will review your request</li>
            <li>Approved refunds will be processed to the original payment method</li>
          </ul>
        </div>
      </div>

      {/* Processing Time */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⏳ Processing Time</h4>
          <p>
            Once approved, refunds are processed within 5–7 working days. The
            time may vary depending on your bank or payment provider.
          </p>
        </div>
      </div>

      {/* Shipping */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🚚 Return Shipping</h4>
          <p>
            Customers may be responsible for return shipping costs unless the
            product is defective or incorrect.
          </p>
        </div>
      </div>

      {/* Cancellation */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🛑 Order Cancellation</h4>
          <p>
            Orders can be canceled before they are shipped. Once shipped,
            cancellation is not possible.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Changes to This Policy</h4>
          <p>
            We may update this refund policy at any time. Changes will be posted
            on this page.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions about refunds or returns, please contact us
            through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;