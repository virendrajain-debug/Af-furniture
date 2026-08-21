// ============================================================
// Forgot Password Page Component
// ============================================================
// Allows admin to request a password reset OTP.
// Calls POST /api/auth/forgot-password with the email.
// On success, navigates to /otp page for verification.
// ============================================================

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Submit email to request OTP
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return showToast('Please enter your email', 'warning')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      showToast(data.message, 'success')
      // Save email for OTP page
      localStorage.setItem('af_reset_email', email)
      setTimeout(() => navigate('/otp'), 800)
    } catch {
      showToast('Server error', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="login-card">
        <img src="/aeryp.png" alt="AF Furniture" className="logo" />
        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your email to receive a verification code</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        <Link to="/" className="back-link">Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
