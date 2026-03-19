// Disclosure.jsx
import React from "react";

const Disclosure = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Disclosure</h1>
        <p className="text-muted">
          Transparency is important to us. This page explains how we may earn revenue.
        </p>
      </div>

      {/* Intro */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p>
            This website may contain affiliate links, which means we may earn a
            commission if you click on a link and make a purchase. This comes at
            no additional cost to you.
          </p>
        </div>
      </div>

      {/* Affiliate Info */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔗 Affiliate Links</h4>
          <p className="mt-2">
            Some of the links on our website are affiliate links. When you click
            on these links and buy a product, we may receive a small commission.
          </p>
          <p>
            These commissions help us maintain and improve our website and
            continue providing valuable content.
          </p>
        </div>
      </div>

      {/* No Extra Cost */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">💸 No Extra Cost to You</h4>
          <p>
            Purchasing through affiliate links does not increase the price you
            pay. The cost remains the same whether you use our link or go directly
            to the website.
          </p>
        </div>
      </div>

      {/* Honest Recommendations */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">✅ Honest Recommendations</h4>
          <p>
            We only recommend products that we believe provide value to our users.
            Our opinions are based on research, experience, and customer feedback.
          </p>
        </div>
      </div>

      {/* Sponsored Content */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">📢 Sponsored Content</h4>
          <p>
            From time to time, we may feature sponsored content or collaborations.
            Such content will always be clearly identified.
          </p>
        </div>
      </div>

      {/* Liability */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⚠️ Responsibility</h4>
          <p>
            While we strive to provide accurate and up-to-date information, we are
            not responsible for any issues arising from purchases made through
            third-party links.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Changes to This Disclosure</h4>
          <p>
            We may update this disclosure at any time. Any changes will be posted
            on this page.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions about this disclosure, feel free to contact
            us through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;