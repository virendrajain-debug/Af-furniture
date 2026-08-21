// ============================================================
// Hero Section Component
// ============================================================
// Full-width hero banner with background image, headline, and CTA.
// Features a decorative curved shape in the bottom-right corner.
// ============================================================

function Hero() {
  return (
    <section className="hero">
      <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=85" alt="Modern green sofa in a living room" />
      <div className="hero-shade"></div>
      <div className="hero-curve" aria-hidden="true"></div>
      <div className="hero-copy">
        <span>AF FURNISHINGS</span>
        <h1>Comfort made<br />for <i>everyday living.</i></h1>
        <p>Furniture, beds and appliances to make your home feel complete.</p>
        <a href="#deals" className="primary">Shop weekly deals</a>
      </div>
    </section>
  )
}

export default Hero
