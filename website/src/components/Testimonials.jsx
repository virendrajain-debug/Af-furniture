// ============================================================
// Testimonials Section Component
// ============================================================
// Three customer testimonials with scroll-triggered animations.
// Each card has a staggered fade-in animation on scroll.
// ============================================================

const testimonials = [
  { text: '"The sofa is beautiful and the process was so easy. It has made our lounge our favourite room."', author: '— Mele T.' },
  { text: '"Friendly service, great quality, and our new bedroom set looks wonderful."', author: '— Kiri R.' },
  { text: '"We found everything for our dining space in one place. Highly recommended."', author: '— Ana S.' },
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-title fade-in">
        <span>FROM OUR CUSTOMERS</span>
        <h2>Homes made happier.</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <blockquote key={i} className={`fade-in stagger-${i + 1}`}>
            {t.text}
            <cite>{t.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
