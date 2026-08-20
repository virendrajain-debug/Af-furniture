import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Overview from './Overview'
import Categories from './Categories'
import Subcategories from './Subcategories' 
import AddProduct from './AddProduct'
import ProductList from './ProductList'
import Terms from './Terms'
import About from './About'
import Profile from './Profile'
import PrivacyPolicy from './PrivacyPolicy'
import Contact from './Contact'
import AdCampaign from './AdCampaign'
import Slider from './Slider'
import ActiveEnquiry from './ActiveEnquiry'
import PastEnquiry from './PastEnquiry'
import DiscountList from './DiscountList'

function Dashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('adminProfileImage') || null
  })

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
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} profileImage={profileImage} onLogout={onLogout} />
      <div className="dashboard-main">
        <Header onLogout={onLogout} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} profileImage={profileImage} />
        <div className="dashboard-content">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="categories" element={<Categories />} />
            <Route path="subcategories" element={<Subcategories />} /> 
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<ProductList />} />
            <Route path="ad-campaign" element={<AdCampaign />} />
            <Route path="slider" element={<Slider />} />
            <Route path="active-enquiry" element={<ActiveEnquiry />} />
            <Route path="past-enquiry" element={<PastEnquiry />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact" element={<Contact />} />
            <Route path="discount-list" element={<DiscountList />} />

            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile profileImage={profileImage} onProfileImageChange={handleProfileImageChange} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard