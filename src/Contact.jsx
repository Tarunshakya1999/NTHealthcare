import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await axios.post(
        "https://nthealthcarebackend.onrender.com/api/contact/",
        formData
      );

      if (res.status === 201 || res.status === 200) {
        setStatus({
          type: "success",
          message: "🎉 Message sent successfully! We will contact you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setStatus({
        type: "danger",
        message: "❌ Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(135deg, #667eea, #764ba2, #ff758c)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">

              {/* Glass Card */}
              <div
                className="p-5 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <h2 className="text-center text-white fw-bold mb-3">
                  📞 Get In Touch
                </h2>

                <p className="text-center text-light mb-4">
                  We'd love to hear from you! Fill out the form and we’ll reply soon.
                </p>

                {/* Status Alert */}
                {status.message && (
                  <div
                    className={`alert alert-${status.type} text-center`}
                    role="alert"
                  >
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-white fw-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill px-4 py-2"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill px-4 py-2"
                      id="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-white fw-semibold">
                      Message
                    </label>
                    <textarea
                      className="form-control rounded-4 px-4 py-3"
                      id="message"
                      rows="4"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 rounded-pill fw-semibold py-2"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(45deg, #ff758c, #ff7eb3)",
                      border: "none",
                      color: "white",
                      transition: "0.3s",
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Sending...
                      </>
                    ) : (
                      "🚀 Send Message"
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}