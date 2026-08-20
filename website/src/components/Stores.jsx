const stores = [
  {
    img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80',
    city: 'Auckland',
    desc: 'Central Auckland showroom\nOpen by appointment',
    link: 'mailto:affurniture@gmail.com',
    linkText: 'Book a visit →',
  },
  {
    img: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?auto=format&fit=crop&w=900&q=80',
    city: 'Wellington',
    desc: 'Wellington design studio\nOpen by appointment',
    link: 'mailto:affurniture@gmail.com',
    linkText: 'Book a visit →',
  },
  {
    img: 'https://images.unsplash.com/photo-1617104551722-3b2d51366481?auto=format&fit=crop&w=900&q=80',
    city: 'Online consultations',
    desc: 'Meet with our furnishing team\nfrom wherever you are.',
    link: 'tel:12345667890',
    linkText: 'Call us →',
  },
]

function Stores() {
  return (
    <section className="stores" id="living">
      <div className="section-title">
        <span>VISIT US</span>
        <h2>Our showrooms.</h2>
      </div>
      <div className="store-grid">
        {stores.map((s, i) => (
          <article key={i}>
            <img src={s.img} alt={s.city} />
            <h3>{s.city}</h3>
            <p>{s.desc.split('\n').map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}</p>
            <a href={s.link}>{s.linkText}</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Stores
