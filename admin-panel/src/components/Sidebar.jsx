// ============================================================
// Sidebar Navigation Component
// ============================================================
// Fixed left sidebar with navigation links.
// Used in the dashboard layout.
//
// NAVIGATION ITEMS:
//   Dashboard (Overview), Categories, Add Product,
//   Product List, Terms & Conditions, About
//
// FEATURES:
//   - Active link highlighting (via NavLink)
//   - Mobile responsive with overlay
//   - Profile image display
// ============================================================

import { NavLink } from 'react-router-dom'

function Sidebar({ isOpen, onClose, profileImage }) {
  // Navigation items configuration
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', end: true },
    { to: '/dashboard/categories', label: 'Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { to: '/dashboard/add-product', label: 'Add Product', icon: 'M12 4v16m8-8H4' },
    { to: '/dashboard/products', label: 'Product List', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { to: '/dashboard/terms', label: 'Terms & Conditions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { to: '/dashboard/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  return (
    <>
      {/* Mobile overlay - click to close sidebar */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar header with logo */}
        <div className="sidebar-header">
          {profileImage ? (
            <img src={profileImage} alt="Admin" className="sidebar-logo" style={{ objectFit: 'cover' }} />
          ) : (
            <img src="/serthkuyghj.png" alt="AF Furniture" className="sidebar-logo" />
          )}
          <span className="sidebar-brand">AF Furniture</span>
        </div>

        {/* Navigation links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>AF Furniture Admin</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
