import { useState } from 'react'

function Contact() {
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '', address: '', whatsapp: '' })
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value })
  }

  return (
    <div className="about-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Contact Information</h2>
        <p>Update the contact details displayed on your storefront</p>
      </div>

      <div className="about-form">
        <div className="form-row">
          <div className="input-group">
            <label>Support Email</label>
            <input type="email" value={contactInfo.email} onChange={(e) => handleChange('email', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Primary Phone</label>
            <input type="text" value={contactInfo.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>WhatsApp Number</label>
            <input type="text" value={contactInfo.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <label>Office Address</label>
          <textarea rows="4" value={contactInfo.address} onChange={(e) => handleChange('address', e.target.value)} />
        </div>

        <button className="btn-primary" onClick={() => showToast('Contact info updated', 'success')}>Save Changes</button>
      </div>
    </div>
  )
}

export default Contact