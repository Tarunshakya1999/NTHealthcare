// Disclaimer.jsx
import React from "react";

const Disclaimer = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Disclaimer</h1>
        <p className="text-muted">
          Please read this disclaimer carefully before using our website or products.
        </p>
      </div>

      {/* Intro */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <p>
            The information provided on this website is for general informational
            and educational purposes only. By using this website, you accept this
            disclaimer in full.
          </p>
        </div>
      </div>

      {/* Not Medical Advice */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⚕️ Not Medical Advice</h4>
          <p className="mt-2">
            The products listed on this website, including fish oil, liver support,
            and other dietary supplements, are not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p>
            The content on this website should not be considered as a substitute
            for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>

      {/* Consult Doctor */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">👨‍⚕️ Consult a Healthcare Professional</h4>
          <p className="mt-2">
            Always consult your doctor or a qualified healthcare provider before
            starting any supplement, especially if you:
          </p>
          <ul>
            <li>Have any medical condition</li>
            <li>Are pregnant or breastfeeding</li>
            <li>Are taking medications</li>
            <li>Have allergies or sensitivities</li>
          </ul>
        </div>
      </div>

      {/* Results Disclaimer */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">📊 No Guaranteed Results</h4>
          <p>
            Results from using our products may vary from person to person. We do
            not guarantee any specific results or outcomes.
          </p>
        </div>
      </div>

      {/* Liability */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">⚠️ Limitation of Liability</h4>
          <p>
            We are not responsible for any adverse effects, damages, or losses
            resulting from the use or misuse of our products or reliance on the
            information provided on this website.
          </p>
        </div>
      </div>

      {/* External Links */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔗 External Links Disclaimer</h4>
          <p>
            Our website may contain links to third-party websites. We do not have
            control over their content and are not responsible for any information
            or services provided by them.
          </p>
        </div>
      </div>

      {/* Updates */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="fw-semibold">🔄 Changes to This Disclaimer</h4>
          <p>
            We may update this disclaimer at any time without prior notice. Please
            review this page periodically for changes.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-semibold">📩 Contact Us</h4>
          <p>
            If you have any questions regarding this disclaimer, feel free to
            contact us through our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;