import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would POST to a /api/contact endpoint.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <div className="page-hero container">
        <h1>Get in touch</h1>
        <p>Questions about an order, bulk/wedding orders, or a franchise enquiry? We'd love to hear from you.</p>
      </div>

      <div className="container contact-layout">
        <div>
          <h3 style={{ marginBottom: 24 }}>Contact information</h3>
          <div className="contact-info-item">
            <span className="ic">✉</span>
            <div>
              <strong>Email</strong>
              <p style={{ margin: 0 }}>support@rewamix.com</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="ic">☎</span>
            <div>
              <strong>Phone</strong>
              <p style={{ margin: 0 }}>+91 98765 43210</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="ic">📍</span>
            <div>
              <strong>Address</strong>
              <p style={{ margin: 0 }}>Shop No. 12, Sadar Bazaar, Karol Bagh, New Delhi, India</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="ic">🕐</span>
            <div>
              <strong>Hours</strong>
              <p style={{ margin: 0 }}>Mon – Sun, 9:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>

        <div>
          {sent && (
            <div className="form-error" style={{ background: "var(--accent-soft)", color: "var(--primary)", borderColor: "var(--accent)" }}>
              Thanks — your message has been sent. We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
