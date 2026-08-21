// ============================================================
// Footer Component
// ============================================================
// Site footer with logo, navigation links, info columns, and copyright.
// Updated to include About, Contact, Terms links.
// ============================================================

function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/logo.png" alt="AF Furnishings" />
      </div>

      {/* Main navigation links */}
      <nav className="footer-nav">
        <a href="#home">Home</a>
        <a href="#winz">Winz</a>
        <a href="#bedroom">Bedroom</a>
        <a href="#dining">Dining</a>
        <a href="#living">Living</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#terms">Terms</a>
        <a href="#deals">On Sale</a>
      </nav>

      {/* Three-column footer info */}
      <div className="footer-columns">
        <div>
          <h3>AF Furnishings</h3>
          <a href="#living">Showrooms</a>
          <a href="#contact">Contact us</a>
          <a href="#winz">Shop furniture</a>
        </div>
        <div>
          <h3>Customer care</h3>
          <a href="#deals">Delivery information</a>
          <a href="#deals">Returns</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href="tel:12345667890">12345667890</a>
          <a href="mailto:affurniture@gmail.com">affurniture@gmail.com</a>
          <span>Follow our latest arrivals online.</span>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="footer-bottom">
        <span>&copy; 2026 AF Furnishings. All rights reserved.</span>
        <span>Secure payments &#8226; Friendly service &#8226; Home delivery</span>
      </div>
    </footer>
  )
}

export default Footer
