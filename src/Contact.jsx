import React from "react";

export default function Contact() {
  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #efdeffff 0%, #ffccb5ff 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 rounded-4 border-0">
            <h1 className="text-center mb-4 fw-bold">Contact Us</h1>

            <p className="text-center mb-4 fs-5 text-muted">
              Have questions or need support? We'd love to hear from you!
            </p>

            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control form-control-lg rounded-3"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control form-control-lg rounded-3"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="form-control form-control-lg rounded-3"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3">
                Send Message
              </button>
            </form>

            <div className="mt-5 text-center">
              <h2 className="fs-3 fw-semibold mb-2">Our Location</h2>
              <p className="fs-5 mb-1">123 Main Street, Your City, India</p>
              <p className="fs-5 mb-1">📞 +91 98765 43210</p>
              <p className="fs-5">📧 support@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
