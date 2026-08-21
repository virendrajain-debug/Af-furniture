// ============================================================
// Promo Poster Component
// ============================================================
// Promotional banner with background image and pricing info.
// Fetches the first featured product price from the API.
// ============================================================

import { useState, useEffect } from 'react'

function PromoPoster() {
  const [price, setPrice] = useState(null)

  // Fetch featured product price
  useEffect(() => {
    fetch('/api/products?featured=true&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.length > 0 && data[0].selling_price) {
          setPrice(Number(data[0].selling_price).toLocaleString())
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="promo-poster">
      <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85" alt="Modern sofa promotion" />
      <div>
        <span>AF WEEKLY SPECIAL</span>
        <h2>Bring comfort home.</h2>
        <p>Explore our latest living-room arrivals, all priced at <b>{price ? `$${price}` : '$00'}</b>.</p>
        <a className="primary" href="#winz">Shop Winz</a>
      </div>
    </section>
  )
}

export default PromoPoster
