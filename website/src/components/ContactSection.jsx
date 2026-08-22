// ============================================================
// Contact Section Component
// ============================================================
// Contact form that submits enquiries to the API.
// Calls POST /api/enquiries with type="contact".
//
// FIELDS: Name, Email, Phone, Message
// ============================================================

import { useState } from 'react'
import { API_BASE } from '../config'

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [toast, setToast] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Submit contact form to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      showToast('Please fill in name and email', 'warning')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact' }),
      })
      if (res.ok) {
        showToast('Message sent! We\'ll get back to you soon.', 'success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        showToast('Failed to send message', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
    setSubmitting(false)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-title">
        <span>GET IN TOUCH</span>
        <h2>Contact us.</h2>
      </div>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
          <div className="input-group">
            <label>Your Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
          </div>
          <div className="input-group">
            <label>Your Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
          </div>
          <div className="input-group">
            <label>Message</label>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="How can we help you?" />
          </div>
          <button type="submit" className="primary" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
