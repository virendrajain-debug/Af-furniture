import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import OTP from './pages/OTP'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('af_admin_auth') === 'true'
  })

  const handleLogin = () => {
    localStorage.setItem('af_admin_auth', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('af_admin_auth')
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
          }
        />
        <Route
          path="/otp"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <OTP onResetComplete={handleLogout} />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
