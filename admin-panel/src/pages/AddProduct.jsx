import { useState } from 'react'

function AddProduct() {
  const [form, setForm] = useState({
    name: '', category: '', mrp: '', sellingPrice: '', discountedPrice: '',
    description: '', stock: '', material: '', color: '', size: '',
    dimensions: '', weight: '', warranty: '', deliveryInfo: '',
    featured: false, newArrival: false
  })
  const [images, setImages] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, { url: reader.result, name: file.name }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.category || !form.mrp) {
      return showToast('Please fill required fields', 'warning')
    }
    showToast('Product added successfully', 'success')
    setForm({
      name: '', category: '', mrp: '', sellingPrice: '', discountedPrice: '',
      description: '', stock: '', material: '', color: '', size: '',
      dimensions: '', weight: '', warranty: '', deliveryInfo: '',
      featured: false, newArrival: false
    })
    setImages([])
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

        <div className="form-section-title">Pricing</div>
        <div className="form-row form-row-3">
          <div className="input-group">
            <label>MRP (₹) *</label>
            <input
              type="number"
              name="mrp"
              placeholder="e.g. 35000"
              value={form.mrp}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Selling Price (₹)</label>
            <input
              type="number"
              name="sellingPrice"
              placeholder="e.g. 30000"
              value={form.sellingPrice}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Discounted Price (₹)</label>
            <input
              type="number"
              name="discountedPrice"
              placeholder="e.g. 27000"
              value={form.discountedPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        {form.mrp && form.discountedPrice && (
          <div className="price-summary">
            <span className="price-mrp">MRP: ₹{Number(form.mrp).toLocaleString()}</span>
            <span className="price-selling">Selling: ₹{Number(form.sellingPrice || form.discountedPrice).toLocaleString()}</span>
            <span className="price-discount">
              {Math.round(((form.mrp - (form.discountedPrice || form.sellingPrice)) / form.mrp) * 100)}% OFF
            </span>
          </div>
        )}

        <div className="form-section-title">Product Details</div>
        <div className="form-row">
          <div className="input-group">
            <label>Material</label>
            <input
              type="text"
              name="material"
              placeholder="e.g. Solid Oak Wood"
              value={form.material}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder="e.g. Walnut Brown"
              value={form.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Size</label>
            <select name="size" value={form.size} onChange={handleChange}>
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div className="input-group">
            <label>Dimensions (L x W x H)</label>
            <input
              type="text"
              name="dimensions"
              placeholder="e.g. 120cm x 80cm x 75cm"
              value={form.dimensions}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="e.g. 25"
              value={form.weight}
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

        <div className="form-row">
          <div className="input-group">
            <label>Warranty</label>
            <input
              type="text"
              name="warranty"
              placeholder="e.g. 1 Year Manufacturer Warranty"
              value={form.warranty}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Delivery Info</label>
            <input
              type="text"
              name="deliveryInfo"
              placeholder="e.g. Free delivery in 5-7 days"
              value={form.deliveryInfo}
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

        <div className="form-section-title">Labels</div>
        <div className="form-row">
          <label className="checkbox-group">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            <span>Featured Product</span>
          </label>
          <label className="checkbox-group">
            <input
              type="checkbox"
              name="newArrival"
              checked={form.newArrival}
              onChange={handleChange}
            />
            <span>New Arrival</span>
          </label>
        </div>

        <div className="input-group">
          <label>Product Images</label>
          <label className="upload-area">
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden />
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>Click to upload or drag and drop</p>
            <span>PNG, JPG up to 5MB each</span>
          </label>
          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map((img, i) => (
                <div className="image-preview-item" key={i}>
                  <img src={img.url} alt={img.name} />
                  <button type="button" className="image-remove-btn" onClick={() => removeImage(i)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => {
            setForm({ name: '', category: '', mrp: '', sellingPrice: '', discountedPrice: '', description: '', stock: '', material: '', color: '', size: '', dimensions: '', weight: '', warranty: '', deliveryInfo: '', featured: false, newArrival: false })
            setImages([])
          }}>Clear All</button>
          <button type="submit" className="btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
