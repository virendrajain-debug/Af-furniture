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
