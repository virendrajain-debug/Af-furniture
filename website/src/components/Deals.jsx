// ============================================================
// Deals Section Component
// ============================================================
// Three-column value proposition section with scroll animations.
// Highlights: Reliable Delivery, Easy Payment Plans, Friendly Support.
// Each card has a staggered fade-in animation.
// ============================================================

function Deals() {
  return (
    <section className="deals" id="deals">
      <div className="fade-in">
        <h2>Weekly home essentials</h2>
        <p>Comfortable furniture at straightforward prices.</p>
      </div>
      <div className="deal-grid">
        <div className="fade-in stagger-1">
          <b>&#10022;</b>
          <h3>Reliable delivery</h3>
          <p>Carefully delivered to your doorstep.</p>
        </div>
        <div className="fade-in stagger-2">
          <b>&#9676;</b>
          <h3>Easy payment plans</h3>
          <p>Flexible weekly payments to suit you.</p>
        </div>
        <div className="fade-in stagger-3">
          <b>&#9825;</b>
          <h3>Friendly support</h3>
          <p>Helpful service when you need it.</p>
        </div>
      </div>
    </section>
  )
}

export default Deals
