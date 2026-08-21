// ============================================================
// About Page Editor Component
// ============================================================
// Edit company information displayed on the website About section.
//
// API CALLS:
//   GET  /api/about  - Fetch current about info
//   PUT  /api/about  - Save updated about info
//
// FIELDS:
//   Company Name, Tagline, Description, Address, Phone, Email
// ============================================================

import { useState, useEffect } from 'react'

function About({ token }) {
  const [company, setCompany] = useState({
    company_name: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
  })
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch about info on mount
  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(data => {
        if (data.company_name) setCompany(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (field, value) => {
    setCompany({ ...company, [field]: value })
  }

  // Save about info to API
  const handleSave = async () => {
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(company),
      })
      if (res.ok) {
        showToast('About info updated', 'success')
      } else {
        showToast('Failed to save', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  return (
    <div className="about-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>About Company</h2>
        <p>Update your company information visible to customers</p>
      </div>

      <div className="about-form">
        <div className="input-group">
          <label>Company Name</label>
          <input type="text" value={company.company_name} onChange={(e) => handleChange('company_name', e.target.value)} disabled={loading} />
        </div>

        <div className="input-group">
          <label>Tagline</label>
          <input type="text" value={company.tagline} onChange={(e) => handleChange('tagline', e.target.value)} disabled={loading} />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea rows="6" value={company.description} onChange={(e) => handleChange('description', e.target.value)} disabled={loading} />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Address</label>
            <input type="text" value={company.address} onChange={(e) => handleChange('address', e.target.value)} disabled={loading} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Phone</label>
            <input type="text" value={company.phone} onChange={(e) => handleChange('phone', e.target.value)} disabled={loading} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={company.email} onChange={(e) => handleChange('email', e.target.value)} disabled={loading} />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave} disabled={loading}>Save Changes</button>
      </div>
    </div>
  )
}

export default About
