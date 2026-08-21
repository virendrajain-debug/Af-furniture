// ============================================================
// Categories Management Page
// ============================================================
// Add and delete product categories.
//
// API CALLS:
//   GET  /api/categories     - Fetch all categories with product counts
//   POST /api/categories     - Create new category
//   DELETE /api/categories/:id - Delete category
//
// All mutation endpoints require auth token.
// ============================================================

import { useState, useEffect } from 'react'

function Categories({ token }) {
  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch categories from API on component mount
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch {
      showToast('Failed to load categories', 'error')
    }
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  // Add new category
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newCat.trim()) return showToast('Enter a category name', 'warning')

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newCat.trim() }),
      })
      const data = await res.json()

      if (res.ok) {
        setNewCat('')
        showToast('Category added', 'success')
        fetchCategories() // Refresh list
      } else {
        showToast(data.message || 'Failed to add category', 'error')
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  // Delete category by ID
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast('Category removed', 'success')
        fetchCategories() // Refresh list
      }
    } catch {
      showToast('Server error', 'error')
    }
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Product Categories</h2>
        <p>Manage your furniture categories</p>
      </div>

      {/* Add category form */}
      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New category name"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button type="submit" className="btn-primary">Add Category</button>
      </form>

      {/* Categories list */}
      {loading ? (
        <div className="empty-state"><p>Loading...</p></div>
      ) : categories.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <p>No categories yet</p>
          <span>Add your first category using the form above</span>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat.id}>
              <div className="cat-info">
                <h3>{cat.name}</h3>
                <span className="cat-count">{cat.product_count} products</span>
              </div>
              <button className="btn-icon" onClick={() => handleDelete(cat.id)} title="Remove">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
