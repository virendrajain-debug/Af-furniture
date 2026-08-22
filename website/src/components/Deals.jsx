function Deals() {
  return (
    <section className="deals" id="deals">
      <div className="fade-in">
        <h2>Weekly home essentials</h2>
        <p>Comfortable furniture at straightforward prices. Flexible weekly payments available.</p>
      </div>
      <div className="deal-grid">
        <div className="fade-in stagger-1">
          <div className="deal-img-wrap">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80" alt="Reliable delivery" />
          </div>
          <h3>Reliable delivery</h3>
          <p>Carefully delivered to your doorstep across New Zealand. Free delivery on orders over $500.</p>
        </div>
        <div className="fade-in stagger-2">
          <div className="deal-img-wrap">
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80" alt="Easy payment plans" />
          </div>
          <h3>Easy payment plans</h3>
          <p>Flexible weekly payments from just $10/week. No hidden fees, transparent pricing.</p>
        </div>
        <div className="fade-in stagger-3">
          <div className="deal-img-wrap">
            <img src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=400&q=80" alt="Friendly support" />
          </div>
          <h3>Friendly support</h3>
          <p>Our team is here to help 7 days a week. Chat with us online or visit our showrooms.</p>
        </div>
      </div>
    </section>
  )
}

export default Deals
