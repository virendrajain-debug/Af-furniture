// ============================================================
// Dashboard Layout Component
// ============================================================
// Main dashboard layout with sidebar navigation and content area.
// Uses React Router for nested route rendering.
//
// ROUTES HANDLED:
//   /dashboard          -> Overview (stats)
//   /dashboard/categories -> Categories management
//   /dashboard/add-product -> Add new product form
//   /dashboard/products -> Product list
//   /dashboard/terms    -> Terms & Conditions editor
//   /dashboard/about    -> About page editor
//   /dashboard/profile  -> Admin profile settings
//
// STATE:
//   - sidebarOpen: Toggle mobile sidebar visibility
//   - profileImage: Admin profile photo (stored in localStorage)
// ============================================================

import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Overview from './Overview'
import Categories from './Categories'
import AddProduct from './AddProduct'
import ProductList from './ProductList'
import Terms from './Terms'
import About from './About'
import Profile from './Profile'

function Dashboard({ onLogout, token }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Load profile image from localStorage on mount
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('adminProfileImage') || null
  })

  // Update profile image and persist to localStorage
  const handleProfileImageChange = (img) => {
    setProfileImage(img)
    if (img) {
      localStorage.setItem('adminProfileImage', img)
    } else {
      localStorage.removeItem('adminProfileImage')
    }
  }

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} profileImage={profileImage} />
      <div className="dashboard-main">
        <Header onLogout={onLogout} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} profileImage={profileImage} token={token} />
        <div className="dashboard-content">
          <Routes>
            <Route index element={<Overview token={token} />} />
            <Route path="categories" element={<Categories token={token} />} />
            <Route path="add-product" element={<AddProduct token={token} />} />
            <Route path="products" element={<ProductList token={token} />} />
            <Route path="terms" element={<Terms token={token} />} />
            <Route path="about" element={<About token={token} />} />
            <Route path="profile" element={<Profile profileImage={profileImage} onProfileImageChange={handleProfileImageChange} token={token} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
