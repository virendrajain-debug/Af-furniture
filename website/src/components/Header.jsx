// ============================================================
// Header / Navigation Component
// ============================================================
// Sticky header with logo, navigation links, search bar, and social icons.
//
// FEATURES:
//   - Mobile hamburger menu toggle
//   - Smooth scroll navigation (anchor links)
//   - Search form (scrolls to products section)
//   - Instagram/Facebook social links
//   - Sticky positioning (stays at top on scroll)
//
// NAVIGATION LINKS:
//   Home, Lounge, Bedroom, Winz (was Sofas), Dining,
//   Living, About, Contact, Terms, On Sale!
// ============================================================

import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle search form submission - scroll to products
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const el = document.getElementById('winz')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="site-header">
      <a className="logo" href="#home">
        <img src="/logo.png" alt="AF Furnishings" />
      </a>

      {/* Mobile hamburger button */}
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
        &#9776;
      </button>

      {/* Navigation links */}
      <nav className={menuOpen ? 'open' : ''}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#lounge" onClick={() => setMenuOpen(false)}>Lounge</a>
        <a href="#bedroom" onClick={() => setMenuOpen(false)}>Bedroom</a>
        <a href="#winz" onClick={() => setMenuOpen(false)}>Winz</a>
        <a href="#dining" onClick={() => setMenuOpen(false)}>Dining</a>
        <a href="#living" onClick={() => setMenuOpen(false)}>Living</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="#terms" onClick={() => setMenuOpen(false)}>Terms</a>
        <a className="sale-link" href="#deals" onClick={() => setMenuOpen(false)}>On Sale!</a>
      </nav>

      {/* Search bar and social icons */}
      <div className="header-tools">
        <form className="header-search" role="search" onSubmit={handleSearch}>
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button aria-label="Search" type="submit">&#8981;</button>
        </form>
        <div className="header-social">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
