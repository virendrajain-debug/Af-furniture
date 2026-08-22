import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const navCategories = [
  {
    label: 'Bedroom',
    href: '#bedroom',
    subcategories: [
      { label: 'All Bedroom', href: '#bedroom' },
      { label: 'Bed Frames', href: '#bedroom' },
      { label: 'Mattresses', href: '#bedroom' },
      { label: 'Bedroom Sets', href: '#bedroom' },
    ],
  },
  {
    label: 'Dining',
    href: '#dining',
    subcategories: [
      { label: 'All Dining', href: '#dining' },
      { label: 'Dining Suites', href: '#dining' },
      { label: 'Dining Tables', href: '#dining' },
      { label: 'Dining Chairs', href: '#dining' },
    ],
  },
  {
    label: 'Living',
    href: '#living',
    subcategories: [
      { label: 'All Living', href: '#living' },
      { label: 'Coffee Tables', href: '#living' },
      { label: 'Console Tables', href: '#living' },
      { label: 'Bar Stools', href: '#living' },
    ],
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const el = document.getElementById('sofas')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setHoveredMenu(null)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="announcement-bar">
        Welcome to AF Furnishings <span>&#8226;</span> Quality pieces for every home
      </div>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <Link className="logo" to="/">
          <img src="/logo.png" alt="AF Furnishings" />
        </Link>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          &#9776;
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#home" onClick={() => handleNavClick('#home')}>Home</a>

          {navCategories.map((cat) => (
            <div
              key={cat.label}
              className="nav-dropdown"
              onMouseEnter={() => setHoveredMenu(cat.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <a
                href={cat.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(cat.href) }}
              >
                {cat.label} <span className="dropdown-arrow">&#9662;</span>
              </a>
              {hoveredMenu === cat.label && (
                <div className="dropdown-menu">
                  {cat.subcategories.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(sub.href) }}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/winz">WinZ</Link>
          <a className="sale-link" href="#deals" onClick={() => handleNavClick('#deals')}>On Sale!</a>
        </nav>
        <div className="header-tools">
          <a href="#deals" className="btn-finance" onClick={(e) => { e.preventDefault(); handleNavClick('#deals') }}>Apply for finance</a>
          <form className="header-search" role="search" onSubmit={handleSearch}>
            <input
              type="search"
              aria-label="Search products"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button aria-label="Search" type="submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>
          <div className="header-icons">
            <a href="#" className="header-icon" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </a>
            <a href="#" className="header-icon" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </a>
          </div>
        </div>
      </header>
      <a href="#deals" className="aff-bottom" onClick={(e) => { e.preventDefault(); handleNavClick('#deals') }}>APPLY FOR FINANCE</a>
    </>
  )
}

export default Header
