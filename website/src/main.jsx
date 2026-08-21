// ============================================================
// AF Furnishings - Main Entry Point
// ============================================================
// Initializes the React app and sets up:
//   - Custom cursor (outer ring + inner dot)
//   - Scroll-based fade-in animations (IntersectionObserver)
//   - Hover effects for interactive elements
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ---- Custom Cursor Setup ----
// Creates two DOM elements: an outer ring and an inner dot
// They follow the mouse with slight delay for smooth feel
const cursor = document.createElement('div')
cursor.className = 'custom-cursor'
document.body.appendChild(cursor)

const cursorDot = document.createElement('div')
cursorDot.className = 'custom-cursor-dot'
document.body.appendChild(cursorDot)

// Track mouse position and update cursor elements
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
  cursorDot.style.left = e.clientX + 'px'
  cursorDot.style.top = e.clientY + 'px'
})

// Add hover effect when mouse is over clickable elements
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('a, button, input, textarea, select, .product-card, .primary, label')) {
    cursor.classList.add('hovering')
    cursorDot.classList.add('hovering')
  }
})

// Remove hover effect when mouse leaves clickable elements
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('a, button, input, textarea, select, .product-card, .primary, label')) {
    cursor.classList.remove('hovering')
    cursorDot.classList.remove('hovering')
  }
})

// Click animation
document.addEventListener('mousedown', () => cursor.classList.add('clicked'))
document.addEventListener('mouseup', () => cursor.classList.remove('clicked'))

// ---- Scroll Animation Observer ----
// Watches for elements with animation classes and adds 'visible' when in viewport
const observerOptions = {
  threshold: 0.1,   // Trigger when 10% visible
  rootMargin: '0px 0px -50px 0px' // Slightly before entering viewport
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target) // Only animate once
    }
  })
}, observerOptions)

// Observe all elements with animation classes after DOM loads
setTimeout(() => {
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el)
  })
}, 100)

// ---- Render the React App ----
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
