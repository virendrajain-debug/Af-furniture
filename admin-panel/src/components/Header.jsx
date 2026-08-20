import { useNavigate } from 'react-router-dom'

function Header({ onMenuToggle, profileImage }) {
  const navigate = useNavigate()

  return (
    <header className="dashboard-header">
      <div className="header-left">
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
        <div className="header-user" onClick={() => navigate('/dashboard/profile')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar">
            {profileImage ? (
              <img src={profileImage} alt="Admin" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              'A'
            )}
          </div>
          <span className="user-email">admin@gmail.com</span>
        </div>
      </div>
    </header>
  )
}

export default Header