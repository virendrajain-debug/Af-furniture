import { useState } from 'react'

function DiscountList() {
  const [discounts, setDiscounts] = useState([])
  const [code, setCode] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!code.trim()) return showToast('Enter discount code', 'warning')
    setDiscounts([...discounts, { id: Date.now(), code: code.toUpperCase(), value: '10%' }])
    setCode('')
    showToast('Discount code created', 'success')
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Discount & Promotion</h2>
        <p>Create and manage discount codes for checkout</p>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input type="text" placeholder="e.g. SUMMER20" value={code} onChange={(e) => setCode(e.target.value)} />
        <button type="submit" className="btn-primary">Create Code</button>
      </form>

      {discounts.length === 0 ? (
        <div className="empty-state"><p>No discount codes available</p></div>
      ) : (
        <div className="categories-grid">
          {discounts.map(d => (
            <div className="category-card" key={d.id}>
              <div className="cat-info">
                <h3>{d.code}</h3>
                <span className="cat-count">{d.value} OFF</span>
              </div>
              <button className="btn-icon" onClick={() => setDiscounts(discounts.filter(item => item.id !== d.id))}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscountList