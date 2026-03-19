// CookiePolicy.jsx
import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Cookie Policy</h1>
        <p className="text-muted">
          This Cookie Policy explains how we use cookies and similar technologies
          on our website.
        </p>
      </div>

      {/* Intro Card */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <p>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. By continuing to use our website,
            you agree to our use of cookies in accordance with this policy.
          </p>
        </div>
      </div>

      {/* What are Cookies */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">🍪 What are Cookies?</h4>
          <p>
            Cookies are small text files that are stored on your device when you
            visit a website. They help websites remember your preferences and
            improve your overall experience.
          </p>
        </div>
      </div>

      {/* Types of Cookies */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📂 Types of Cookies We Use</h4>
          <ul className="mt-3">
            <li>
              <strong>Essential Cookies:</strong> Required for basic website
              functionality.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Help us understand how users
              interact with our website.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences and
              settings.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used to show relevant ads
              based on your interests.
            </li>
          </ul>
        </div>
      </div>

      {/* How We Use */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">⚙️ How We Use Cookies</h4>
          <p className="mt-2">
            We use cookies to:
          </p>
          <ul>
            <li>Improve website performance and speed</li>
            <li>Analyze user behavior and traffic</li>
            <li>Remember user preferences</li>
            <li>Provide personalized content and ads</li>
          </ul>
        </div>
      </div>

      {/* Third Party */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">🌐 Third-Party Cookies</h4>
          <p>
            Some cookies may be placed by third-party services such as analytics
            tools or advertising networks. These cookies help us understand
            website usage and deliver relevant advertisements.
          </p>
        </div>
      </div>

      {/* Managing Cookies */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">🔧 Managing Cookies</h4>
          <p>
            You can control or disable cookies through your browser settings.
            However, disabling cookies may affect some functionalities of the
            website.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Updates to This Policy</h4>
          <p>
            We may update this Cookie Policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions about our Cookie Policy, you can contact us
            through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;