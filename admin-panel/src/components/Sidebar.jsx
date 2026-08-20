import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({ isOpen, onClose, profileImage, onLogout }) {
  const [open, setOpen] = useState('')
  const toggle = (m) => setOpen(open === m ? '' : m)

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <img src={profileImage || "/serthkuyghj.png"} alt="AF" className="sidebar-logo" style={profileImage ? { objectFit: 'cover' } : {}} />
          <span className="sidebar-brand">AF Furniture</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Dashboard</span>
          </NavLink>

          <div className="sidebar-link" onClick={() => toggle('proj')} style={{ cursor: 'pointer' }}><span>Project Management</span></div>
          {open === 'proj' && <div style={{ paddingLeft: '20px' }}>
            <NavLink to="/dashboard/categories" className="sidebar-link" onClick={onClose}>Categories</NavLink>
            <NavLink to="/dashboard/subcategories" className="sidebar-link" onClick={onClose}>Subcategories</NavLink>
            <NavLink to="/dashboard/products" className="sidebar-link" onClick={onClose}>Product List</NavLink>
          </div>}

          <div className="sidebar-link" onClick={() => toggle('banner')} style={{ cursor: 'pointer' }}><span>Banner Management</span></div>
          {open === 'banner' && <div style={{ paddingLeft: '20px' }}>
            <NavLink to="/dashboard/ad-campaign" className="sidebar-link" onClick={onClose}>Ad Campaign</NavLink>
            <NavLink to="/dashboard/slider" className="sidebar-link" onClick={onClose}>Slider (Banner)</NavLink>
          </div>}

          <div className="sidebar-link" onClick={() => toggle('enquiry')} style={{ cursor: 'pointer' }}><span>Enquiry Management</span></div>
          {open === 'enquiry' && <div style={{ paddingLeft: '20px' }}>
            <NavLink to="/dashboard/active-enquiry" className="sidebar-link" onClick={onClose}>Active Enquiry</NavLink>
            <NavLink to="/dashboard/past-enquiry" className="sidebar-link" onClick={onClose}>Past Enquiry</NavLink>
          </div>}

          <div className="sidebar-link" onClick={() => toggle('pages')} style={{ cursor: 'pointer' }}><span>Pages and Media</span></div>
          {open === 'pages' && <div style={{ paddingLeft: '20px' }}>
            <NavLink to="/dashboard/about" className="sidebar-link" onClick={onClose}>About Us</NavLink>
            <NavLink to="/dashboard/terms" className="sidebar-link" onClick={onClose}>Terms & Condition</NavLink>
            <NavLink to="/dashboard/privacy-policy" className="sidebar-link" onClick={onClose}>Privacy Policy</NavLink>
            <NavLink to="/dashboard/contact" className="sidebar-link" onClick={onClose}>Contact Us</NavLink>
          </div>}

          <div className="sidebar-link" onClick={() => toggle('disc')} style={{ cursor: 'pointer' }}><span>Discount & Promotion</span></div>
          {open === 'disc' && <div style={{ paddingLeft: '20px' }}>
            <NavLink to="/dashboard/discount-list" className="sidebar-link" onClick={onClose}>Discount List</NavLink>
          </div>}

          <NavLink to="/dashboard/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Edit Profile</span>
          </NavLink>

          <div className="sidebar-link" onClick={onLogout} style={{ cursor: 'pointer', color: '#EF4444' }}>
            <span>Logout</span>
          </div>
        </nav>

        <div className="sidebar-footer"><p>AF Furniture Admin</p></div>
      </aside>
    </>
  )
}

export default Sidebar