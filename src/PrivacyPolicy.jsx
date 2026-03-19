// PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Privacy Policy</h1>
        <p className="text-muted">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your information.
        </p>
      </div>

      {/* Intro */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p>
            We are committed to protecting your personal information and your
            right to privacy. By using our website, you agree to the terms of this
            Privacy Policy.
          </p>
        </div>
      </div>

      {/* Information We Collect */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">📂 Information We Collect</h4>
          <p className="mt-2">We may collect the following information:</p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (processed securely via third-party gateways)</li>
            <li>Browsing behavior and device information</li>
          </ul>
        </div>
      </div>

      {/* How We Use */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⚙️ How We Use Your Information</h4>
          <ul className="mt-2">
            <li>To process and deliver your orders</li>
            <li>To communicate with you (order updates, support)</li>
            <li>To improve our website and services</li>
            <li>To personalize user experience</li>
            <li>To send promotional offers (only if you opt-in)</li>
          </ul>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔗 Sharing of Information</h4>
          <p>
            We do not sell or rent your personal data. However, we may share your
            information with:
          </p>
          <ul>
            <li>Payment gateways for secure transactions</li>
            <li>Shipping partners for order delivery</li>
            <li>Analytics tools to improve website performance</li>
          </ul>
        </div>
      </div>

      {/* Cookies */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🍪 Cookies & Tracking</h4>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, analyze traffic, and serve relevant advertisements.
          </p>
        </div>
      </div>

      {/* Data Security */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔒 Data Security</h4>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, misuse, or
            disclosure.
          </p>
        </div>
      </div>

      {/* User Rights */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">👤 Your Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent for marketing</li>
          </ul>
        </div>
      </div>

      {/* Third Party */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🌐 Third-Party Services</h4>
          <p>
            Our website may contain links or integrations with third-party
            services. We are not responsible for their privacy practices.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Updates to This Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us
            through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;