// ============================================================
// Category Banner Component
// ============================================================
// Reusable category hero banner with background image and CTA.
//
// PROPS:
//   id       - HTML anchor ID for navigation
//   title    - Category name (e.g., "Bedroom")
//   subtitle - Short tagline
//   image    - Background image URL
//   link     - CTA button link
//   reverse  - If true, reverses the layout direction
// ============================================================

function Category({ id, title, subtitle, image, link, reverse }) {
  return (
    <section className={`category ${reverse ? 'reverse' : ''}`} id={id}>
      <div className="category-hero">
        <img src={image} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <a className="primary" href={link}>Shop {title.toLowerCase()}</a>
        </div>
      </div>
    </section>
  )
}

export default Category
