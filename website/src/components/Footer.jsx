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
        <a href="#deals">On Sale</a>
      </nav>
      <div className="footer-columns">
        <div>
          <h3>AF Furnishings</h3>
          <a href="#living">Showrooms</a>
          <a href="mailto:affurniture@gmail.com">Contact us</a>
          <a href="#products">Shop furniture</a>
        </div>
        <div>
          <h3>Customer care</h3>
          <a href="#deals">Delivery information</a>
          <a href="#deals">Returns</a>
          <a href="#deals">Frequently asked questions</a>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href="tel:12345667890">12345667890</a>
          <a href="mailto:affurniture@gmail.com">affurniture@gmail.com</a>
          <span>Follow our latest arrivals online.</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 AF Furnishings. All rights reserved.</span>
        <span>Secure payments • Friendly service • Home delivery</span>
      </div>
    </footer>
  )
}

export default Footer
