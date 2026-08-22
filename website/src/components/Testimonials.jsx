const testimonials = [
  { text: 'The sofa is beautiful and the process was so easy. It has made our lounge our favourite room. The quality is outstanding and the weekly payments make it so affordable.', author: 'Mele T.', location: 'Auckland' },
  { text: 'Friendly service, great quality, and our new bedroom set looks wonderful. We shopped around but AF Furnishings had the best range and the staff were incredibly helpful.', author: 'Kiri R.', location: 'Wellington' },
  { text: 'We found everything for our dining space in one place. Highly recommended. The delivery was fast and the team even helped us set up the table.', author: 'Ana S.', location: 'Hamilton' },
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
          <blockquote key={i} className="testimonial-card fade-in">
            <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>&ldquo;{t.text}&rdquo;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.author.charAt(0)}</div>
              <div>
                <cite>&mdash; {t.author}</cite>
                <span className="testimonial-location">{t.location}</span>
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
