import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/logo.png" alt="AF Furnishings" />
      </div>

      <nav className="footer-nav">
        <a href="#home">Home</a>
        <a href="#sofas">Sofas</a>
        <a href="#bedroom">Bedroom</a>
        <a href="#dining">Dining</a>
        <a href="#living">Living</a>
        <Link to="/about">About</Link>
      </nav>

      <div className="footer-columns">
        <div>
          <h3>AF Furnishings</h3>
          <a href="#living">Showrooms</a>
          <Link to="/contact">Contact us</Link>
          <a href="#sofas">Shop furniture</a>
        </div>
        <div>
          <h3>Customer care</h3>
          <a href="#deals">Delivery information</a>
          <a href="#deals">Returns</a>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href="tel:12345667890">12345667890</a>
          <a href="mailto:affurniture@gmail.com">affurniture@gmail.com</a>
          <span>Follow our latest arrivals online.</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 AF Furnishings. All rights reserved.</span>
        <span>Secure payments &bull; Friendly service &bull; Home delivery</span>
      </div>
    </footer>
  )
}

export default Footer
