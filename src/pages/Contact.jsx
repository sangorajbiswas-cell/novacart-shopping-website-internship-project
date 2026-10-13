import { useState } from "react";

// The Contact page has a form with name, email, and message fields.
// It validates that all fields are filled, the email is in a valid format,
// and the message is long enough. On success, a confirmation message appears.

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const newErrors = {};

    // Name: must not be empty and at least 2 characters
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    // Email: must not be empty and must look like a real email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message: must not be empty and at least 10 characters
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate sending the message (no real backend)
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});

    // Hide the success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="nc-page-wrapper">
      <div className="container py-4">
        <div className="nc-page-header text-center">
          <h1 className="nc-page-title">Contact Us</h1>
          <p className="nc-page-subtitle">
            We would love to hear from you. Send us a message!
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Contact Info Cards */}
          <div className="col-lg-4">
            <div className="nc-contact-info">
              <div className="nc-contact-info-card">
                <i className="bi bi-geo-alt-fill nc-contact-icon"></i>
                <h6>Visit Us</h6>
                <p>123 Fashion Street, Mumbai, India 400001</p>
              </div>
              <div className="nc-contact-info-card">
                <i className="bi bi-telephone-fill nc-contact-icon"></i>
                <h6>Call Us</h6>
                <p>+91 98765 43210</p>
              </div>
              <div className="nc-contact-info-card">
                <i className="bi bi-envelope-fill nc-contact-icon"></i>
                <h6>Email Us</h6>
                <p>support@novacart.in</p>
              </div>
              <div className="nc-contact-info-card">
                <i className="bi bi-clock-fill nc-contact-icon"></i>
                <h6>Hours</h6>
                <p>Mon - Sat: 9 AM - 8 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="nc-contact-form-wrap">
              {submitted && (
                <div className="nc-form-success">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label nc-form-label">
                    Full Name <span className="nc-required">*</span>
                  </label>
                  <input
                    type="text"
                    className={"form-control nc-form-input" + (errors.name ? " is-invalid" : "")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback nc-form-error">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label nc-form-label">
                    Email Address <span className="nc-required">*</span>
                  </label>
                  <input
                    type="email"
                    className={"form-control nc-form-input" + (errors.email ? " is-invalid" : "")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback nc-form-error">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label nc-form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control nc-form-input"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about? (optional)"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label nc-form-label">
                    Message <span className="nc-required">*</span>
                  </label>
                  <textarea
                    className={"form-control nc-form-input nc-form-textarea" + (errors.message ? " is-invalid" : "")}
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <div className="invalid-feedback nc-form-error">{errors.message}</div>
                  )}
                </div>

                <button type="submit" className="btn nc-btn-dark btn-lg w-100">
                  <i className="bi bi-send me-2"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
