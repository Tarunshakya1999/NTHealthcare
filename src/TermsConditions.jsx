// TermsConditions.jsx
import React from "react";

const TermsConditions = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Terms & Conditions</h1>
        <p className="text-muted">
          Please read these terms carefully before using our website.
        </p>
      </div>

      {/* Intro */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p>
            By accessing or using our website and purchasing our products, you
            agree to be bound by these Terms & Conditions. If you do not agree,
            please do not use our services.
          </p>
        </div>
      </div>

      {/* Use of Website */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🌐 Use of Website</h4>
          <ul className="mt-2">
            <li>You must be at least 18 years old to use this website</li>
            <li>You agree not to misuse or disrupt our services</li>
            <li>All information provided must be accurate and complete</li>
          </ul>
        </div>
      </div>

      {/* Products */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">💊 Products & Services</h4>
          <p className="mt-2">
            Our products, including fish oil, liver support, and other dietary
            supplements, are intended for general wellness purposes only.
          </p>
          <p>
            They are not intended to diagnose, treat, cure, or prevent any
            disease. Always consult a healthcare professional before use.
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🛒 Orders & Payments</h4>
          <ul className="mt-2">
            <li>All orders are subject to availability and confirmation</li>
            <li>We reserve the right to cancel or refuse any order</li>
            <li>Payments must be completed before order processing</li>
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">💰 Pricing & Changes</h4>
          <p>
            Prices of products are subject to change without prior notice. We are
            not responsible for pricing errors or inaccuracies.
          </p>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">📜 Intellectual Property</h4>
          <p>
            All content on this website, including text, images, and logos, is
            our property and may not be copied or used without permission.
          </p>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⚠️ Limitation of Liability</h4>
          <p>
            We are not responsible for any direct or indirect damages arising
            from the use of our website or products. Use products at your own
            risk.
          </p>
        </div>
      </div>

      {/* External Links */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔗 External Links</h4>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for their content or practices.
          </p>
        </div>
      </div>

      {/* Termination */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🚫 Termination</h4>
          <p>
            We reserve the right to suspend or terminate access to our website
            for any user who violates these terms.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Changes to Terms</h4>
          <p>
            We may update these Terms & Conditions at any time. Changes will be
            posted on this page.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions regarding these Terms & Conditions, please
            contact us through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;