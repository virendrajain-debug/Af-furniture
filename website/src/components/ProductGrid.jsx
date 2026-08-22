import { useState, useEffect, useRef } from 'react'
import { API_BASE } from '../config'

const defaultProducts = [
  { id: 1, name: 'Marina Lounge Chair', mrp: 1299, selling_price: 1099, images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'], material: 'Oak Wood', color: 'Grey' },
  { id: 2, name: 'Haven Three Seat Sofa', mrp: 2499, selling_price: 2199, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'], material: 'Pine Wood', color: 'Green' },
  { id: 3, name: 'Ember Two Seat Sofa', mrp: 1899, selling_price: 1699, images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'], material: 'Metal Frame', color: 'Charcoal' },
  { id: 4, name: 'Harbour Corner Sofa', mrp: 3299, selling_price: 2899, images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80'], material: 'Oak Wood', color: 'Beige' },
]

function ProductGrid({ sectionId, label, title, category, compact }) {
  const [products, setProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const updateSPV = () => setSlidesPerView(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4)
    updateSPV()
    window.addEventListener('resize', updateSPV)
    return () => window.removeEventListener('resize', updateSPV)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}&limit=8`
          : `${API_BASE}/api/products?limit=8`
        const res = await fetch(url)
        const data = await res.json()
        if (data.length > 0) setProducts(data)
      } catch {}
    }
    fetchProducts()
  }, [category])

  const displayProducts = products.length > 0 ? products : defaultProducts
  const maxSlide = Math.max(0, displayProducts.length - slidesPerView)

  const nextSlide = () => setCurrentSlide((p) => Math.min(p + 1, maxSlide))
  const prevSlide = () => setCurrentSlide((p) => Math.max(p - 1, 0))

  const getWeeklyPrice = (price) => {
    if (!price) return null
    return Math.ceil(Number(price) / 52)
  }

  return (
    <section className={`products ${compact ? 'compact' : ''}`} id={sectionId}>
      {label && (
        <div className="section-title">
          <span>{label}</span>
          {title && <h2>{title}</h2>}
        </div>
      )}

      <div className="product-slider-wrapper">
        <button className="slider-btn slider-btn-prev" onClick={prevSlide} disabled={currentSlide === 0}>&#8249;</button>
        <div className="product-slider" ref={sliderRef}>
          <div
            className="product-slider-track"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
          >
            {displayProducts.map((p) => {
              const imgSrc = p.images && p.images.length > 0 && !p.images[0].startsWith('[') ? p.images[0] : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
              const weekly = getWeeklyPrice(p.selling_price || p.mrp)
              const hasDiscount = p.selling_price && p.mrp && Number(p.selling_price) < Number(p.mrp)
              return (
                <article key={p.id} className="product-card">
                  <div className="product-card-img">
                    <img src={imgSrc} alt={p.name} />
                    {hasDiscount && <span className="product-badge">SALE</span>}
                  </div>
                  <div className="product-card-body">
                    <h3>{p.name}</h3>
                    <div className="product-pricing">
                      {p.selling_price && (
                        <span className="product-price">${Number(p.selling_price).toLocaleString()}</span>
                      )}
                      {p.mrp && p.selling_price && Number(p.mrp) !== Number(p.selling_price) && (
                        <span className="product-mrp">${Number(p.mrp).toLocaleString()}</span>
                      )}
                      {!p.selling_price && p.mrp && (
                        <span className="product-price">${Number(p.mrp).toLocaleString()}</span>
                      )}
                    </div>
                    {weekly && (
                      <p className="product-weekly">Or just <strong>${weekly}/week</strong> on finance</p>
                    )}
                    {p.material && <p className="product-meta">{p.material}{p.color ? ` - ${p.color}` : ''}</p>}
                    <button className="btn-shop-now">Shop Now</button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <button className="slider-btn slider-btn-next" onClick={nextSlide} disabled={currentSlide >= maxSlide}>&#8250;</button>
      </div>

      <div className="slider-arrows">
        <button className="arrow-btn" onClick={prevSlide} disabled={currentSlide === 0}>&#8249;</button>
        <button className="arrow-btn" onClick={nextSlide} disabled={currentSlide >= maxSlide}>&#8250;</button>
      </div>
    </section>
  )
}

export default ProductGrid
