// ============================================================
// Product Grid Component
// ============================================================
// Displays a grid of products fetched from the API.
// Falls back to default Unsplash images if no products in DB.
//
// PROPS:
//   sectionId  - HTML anchor ID
//   label      - Section label text (e.g., "WINZ COLLECTION")
//   title      - Section heading
//   productsKey - Fallback product key
//   category   - Category name to filter products from API
//   compact    - If true, uses smaller padding
//
// FEATURES:
//   - Fetches products from GET /api/products?category=X
//   - "Add to enquiry" button opens a modal
//   - Enquiry form submits to POST /api/enquiries
//   - Toast notifications for success/error
// ============================================================

import { useState, useEffect } from 'react'

function ProductGrid({ sectionId, label, title, productsKey, category, compact }) {
  const [products, setProducts] = useState([])
  const [enquiryName, setEnquiryName] = useState('')
  const [enquiryEmail, setEnquiryEmail] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch products from API by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `/api/products?category=${encodeURIComponent(category)}&limit=4`
          : `/api/products?limit=4`
        const res = await fetch(url)
        const data = await res.json()
        if (data.length > 0) {
          setProducts(data)
        }
      } catch {
        // Use fallback default products
      }
    }
    fetchProducts()
  }, [category])

  // Open enquiry modal for a product
  const handleEnquiryClick = (product) => {
    setSelectedProduct(product)
    setShowEnquiryForm(true)
  }

  // Submit enquiry to API
  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    if (!enquiryName || !enquiryEmail) {
      showToast('Please fill in your name and email', 'warning')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryName,
          email: enquiryEmail,
          product_id: selectedProduct?.id,
          product_name: selectedProduct?.name,
          message: `Enquiry about ${selectedProduct?.name}`,
          type: 'product',
        }),
      })
      if (res.ok) {
        showToast('Enquiry submitted! We\'ll get back to you soon.', 'success')
        setShowEnquiryForm(false)
        setEnquiryName('')
        setEnquiryEmail('')
        setSelectedProduct(null)
      } else {
        showToast('Failed to submit enquiry', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
    setSubmitting(false)
  }

  // Fallback products (used when DB has no products yet)
  const defaultProducts = [
    { id: 1, name: 'Marina Lounge Chair', selling_price: 1099, images: ['https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80'] },
    { id: 2, name: 'Haven Three Seat Sofa', selling_price: 2199, images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'] },
    { id: 3, name: 'Ember Two Seat Sofa', selling_price: 1699, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'] },
    { id: 4, name: 'Harbour Corner Sofa', selling_price: 2899, images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80'] },
  ]

  const displayProducts = products.length > 0 ? products : defaultProducts

  return (
    <section className={`products ${compact ? 'compact' : ''}`} id={sectionId}>
      <div className="section-title">
        <span>{label}</span>
        <h2>{title}</h2>
      </div>

      {/* Product cards grid */}
      <div className="product-grid">
        {displayProducts.map((p) => (
          <article key={p.id} className="product-card">
            <img
              src={p.images && p.images.length > 0 && !p.images[0].startsWith('[') ? p.images[0] : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
              alt={p.name}
            />
            <h3>{p.name}</h3>
            <p>${p.selling_price ? Number(p.selling_price).toLocaleString() : p.mrp ? Number(p.mrp).toLocaleString() : '0'}</p>
            <button onClick={() => handleEnquiryClick(p)}>Add to enquiry</button>
          </article>
        ))}
      </div>

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="enquiry-modal-overlay" onClick={() => setShowEnquiryForm(false)}>
          <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
            {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
            <h3>Enquire about {selectedProduct?.name}</h3>
            <form onSubmit={handleEnquirySubmit}>
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} placeholder="Enter your name" required />
              </div>
              <div className="input-group">
                <label>Your Email</label>
                <input type="email" value={enquiryEmail} onChange={(e) => setEnquiryEmail(e.target.value)} placeholder="Enter your email" required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEnquiryForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductGrid
