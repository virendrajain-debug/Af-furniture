// ============================================================
// Dashboard Header Component
// ============================================================
// Top header bar with hamburger menu, title, and user profile.
//
// FEATURES:
//   - Mobile hamburger menu toggle
//   - User avatar and email display
//   - Click avatar to go to Profile page
//   - Decodes JWT to dynamically show user email
// ============================================================

import { useNavigate } from 'react-router-dom'

function Header({ onMenuToggle, profileImage, token }) {
  const navigate = useNavigate()

  // Extract email from JWT token payload dynamically
  let userEmail = 'admin@gmail.com'
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      userEmail = payload.email || userEmail
    }
  } catch {}

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Hamburger menu for mobile */}
        <button className="menu-toggle" onClick={onMenuToggle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="header-title">Admin Panel</h1>
      </div>

      <div className="header-right">
        {/* User info - click to go to profile */}
        <div className="header-user" onClick={() => navigate('/dashboard/profile')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar">
            {profileImage ? (
              <img src={profileImage} alt="Admin" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              'A'
            )}
          </div>
          <span className="user-email">{userEmail}</span>
        </div>
      </div>
    </header>
  )
}

export default Header