// ============================================================
// Product List Page Component
// ============================================================
// Displays all products in a table with delete functionality.
// Fetches from GET /api/products (public endpoint).
// Deletes via DELETE /api/products/:id (requires auth).
//
// TABLE COLUMNS:
//   #, Product (with image), Category, MRP, Selling Price, Stock, Labels, Actions
// ============================================================

import { useState, useEffect } from 'react'

function ProductList({ token }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch all products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch {
      showToast('Failed to load products', 'error')
    }
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  // Delete a product with confirmation
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast('Product deleted', 'success')
        fetchProducts() // Refresh list
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  return (
    <div className="product-list-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Product List</h2>
        <p>All furniture products currently listed</p>
      </div>

      {loading ? (
        <div className="empty-state"><p>Loading...</p></div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p>No products listed yet</p>
          <span>Add your first product from the Add Product page</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>MRP</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Labels</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="order-id">{p.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {p.images && typeof p.images === 'object' && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: 6, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>No img</div>
                      )}
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.category_name || '-'}</td>
                  <td>${Number(p.mrp).toLocaleString()}</td>
                  <td>${Number(p.selling_price || p.mrp).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${p.stock > 0 ? 'replied' : 'pending'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {p.featured ? <span className="status-badge replied" style={{ fontSize: 11 }}>Featured</span> : null}
                      {p.new_arrival ? <span className="status-badge pending" style={{ fontSize: 11 }}>New</span> : null}
                    </div>
                  </td>
                  <td>
                    <button className="btn-icon" onClick={() => handleDelete(p.id)} title="Delete" style={{ color: '#e74c3c' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductList
