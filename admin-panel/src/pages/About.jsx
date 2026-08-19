import { useState } from 'react'

function About() {
  const [company, setCompany] = useState({
    name: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
  })

  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (field, value) => {
    setCompany({ ...company, [field]: value })
  }

  const handleSave = () => {
    showToast('About info updated', 'success')
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
          <input
            type="text"
            value={company.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Tagline</label>
          <input
            type="text"
            value={company.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            rows="6"
            value={company.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              value={company.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              value={company.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={company.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  )
}

export default About
