import { useState } from 'react'

function AddProduct() {
  const [form, setForm] = useState({
    name: '', category: '', price: '', description: '', stock: ''
  })
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.category || !form.price) {
      return showToast('Please fill required fields', 'warning')
    }
    showToast('Product added successfully', 'success')
    setForm({ name: '', category: '', price: '', description: '', stock: '' })
  }

  return (
    <div className="add-product-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Add New Product</h2>
        <p>Fill in the details to list a new furniture item</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Oakwood Dining Table"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Category *</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Dining">Dining</option>
              <option value="Office">Office</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 25000"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              placeholder="e.g. 50"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Write a short product description..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Product Image</label>
          <div className="upload-area">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>Click to upload or drag and drop</p>
            <span>PNG, JPG up to 5MB</span>
          </div>
        </div>

        <button type="submit" className="btn-primary">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
