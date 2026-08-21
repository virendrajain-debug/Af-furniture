// ============================================================
// Profile Page Component
// ============================================================
// Admin profile management - name, email, photo, password.
//
// API CALLS:
//   GET  /api/auth/profile        - Fetch current profile
//   PUT  /api/auth/profile        - Update profile info
//   PUT  /api/auth/change-password - Change password
//
// FEATURES:
//   - Profile photo upload (stored as base64 in localStorage + API)
//   - Name/email editing
//   - Password change with current password verification
// ============================================================

import { useState, useEffect } from 'react'

function Profile({ profileImage, onProfileImageChange, token }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch profile data on mount
  useEffect(() => {
    fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.name) setName(data.name)
        if (data.email) setEmail(data.email)
        if (data.profile_image) onProfileImageChange(data.profile_image)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  // Save profile changes
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email, profile_image: profileImage }),
      })
      if (res.ok) {
        showToast('Profile updated successfully!', 'success')
      } else {
        showToast('Failed to update profile', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (!currentPass || !newPass || !confirmPass) {
      showToast('Please fill all password fields', 'warning')
      return
    }
    if (newPass !== confirmPass) {
      showToast('New passwords do not match', 'error')
      return
    }
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
      })
      const data = await res.json()
      if (res.ok) {
        showToast('Password changed successfully!', 'success')
        setCurrentPass('')
        setNewPass('')
        setConfirmPass('')
      } else {
        showToast(data.message || 'Failed to change password', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  // Handle profile photo upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onProfileImageChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    onProfileImageChange(null)
    showToast('Profile photo removed', 'success')
  }

  // Eye toggle SVG icons
  const EyeOpen = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
  const EyeClosed = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )

  return (
    <div className="profile-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>My Profile</h2>
        <p>Manage your account settings</p>
      </div>

      <div className="profile-grid">
        {/* Profile Info Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <div className="profile-photo-actions">
              <label className="profile-upload-btn">
                <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Change Photo
              </label>
              {profileImage && (
                <button type="button" className="profile-remove-btn" onClick={handleRemovePhoto}>
                  Remove
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="profile-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" disabled={loading} />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" disabled={loading} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>Save Changes</button>
          </form>
        </div>

        {/* Password Change Card */}
        <div className="profile-card">
          <h3 className="profile-card-title">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="profile-form">
            <div className="input-group">
              <label>Current Password</label>
              <div className="pass-wrap">
                <input type={showCurrent ? 'text' : 'password'} value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="Enter current password" />
                <button type="button" className="eye-btn" onClick={() => setShowCurrent(!showCurrent)}>
                  {showCurrent ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>New Password</label>
              <div className="pass-wrap">
                <input type={showNew ? 'text' : 'password'} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Enter new password" />
                <button type="button" className="eye-btn" onClick={() => setShowNew(!showNew)}>
                  {showNew ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>Confirm New Password</label>
              <div className="pass-wrap">
                <input type={showConfirm ? 'text' : 'password'} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm new password" />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
