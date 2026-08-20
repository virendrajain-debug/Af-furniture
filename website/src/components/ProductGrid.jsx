const products = {
  sofas: [
    { img: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80', name: 'Marina Lounge Chair', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', name: 'Haven Three Seat Sofa', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', name: 'Ember Two Seat Sofa', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80', name: 'Harbour Corner Sofa', price: '$00' },
  ],
  bedroom: [
    { img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', name: 'Willow Bedroom Set', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', name: 'Cloud Queen Bed', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', name: 'Solace Bedside Pair', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=800&q=80', name: 'Grace Six Drawer Set', price: '$00' },
  ],
  dining: [
    { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', name: 'Haven Dining Table', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', name: 'Oak Dining Chair', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', name: 'Gathering Table Set', price: '$00' },
    { img: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=800&q=80', name: 'Arden Sideboard', price: '$00' },
  ],
}

function ProductGrid({ sectionId, label, title, productsKey, compact }) {
  return (
    <section className={`products ${compact ? 'compact' : ''}`} id={sectionId}>
      <div className="section-title">
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      <div className="product-grid">
        {products[productsKey].map((p, i) => (
          <article key={i}>
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <button>Add to enquiry</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
