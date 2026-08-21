import { useState } from 'react'

function Subcategories() {
  const [subcategories, setSubcategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [subName, setSubName] = useState('')
  const [toast, setToast] = useState(null)
  
  const availableCategories = ['Living Room', 'Bedroom', 'Dining', 'Office']

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!parentCategory) return showToast('Select a parent category', 'warning')
    if (!subName.trim()) return showToast('Enter a subcategory name', 'warning')
    if (subcategories.some((c) => c.name.toLowerCase() === subName.toLowerCase())) {
      return showToast('Subcategory already exists', 'error')
    }

    setSubcategories([...subcategories, { id: Date.now(), category: parentCategory, name: subName.trim() }])
    setSubName('')
    showToast('Subcategory added', 'success')
  }

  const handleDelete = (id) => {
    setSubcategories(subcategories.filter((c) => c.id !== id))
    showToast('Subcategory removed', 'success')
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Product Subcategories</h2>
        <p>Manage your furniture subcategories and link them to main categories</p>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <select 
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">Select Parent Category</option>
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New subcategory name"
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
        />
        <button type="submit" className="btn-primary">Add Subcategory</button>
      </form>

      {subcategories.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <p>No subcategories yet</p>
          <span>Add your first subcategory using the form above</span>
        </div>
      ) : (
        <div className="categories-grid">
          {subcategories.map((sub) => (
            <div className="category-card" key={sub.id}>
              <div className="cat-info">
                <h3>{sub.name}</h3>
                <span className="cat-count">Parent: {sub.category}</span>
              </div>
              <button className="btn-icon" onClick={() => handleDelete(sub.id)} title="Remove">
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

export default Subcategories