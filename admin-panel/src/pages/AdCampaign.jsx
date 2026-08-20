import { useState } from 'react'

function AdCampaign() {
  const [campaigns, setCampaigns] = useState([])
  const [name, setName] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name.trim()) return showToast('Enter campaign name', 'warning')
    setCampaigns([...campaigns, { id: Date.now(), name, status: 'Active' }])
    setName('')
    showToast('Campaign added', 'success')
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Ad Campaigns</h2>
        <p>Manage promotional campaigns and tracking</p>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input type="text" placeholder="Campaign Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="btn-primary">Add Campaign</button>
      </form>

      {campaigns.length === 0 ? (
        <div className="empty-state">
          <p>No active campaigns</p>
        </div>
      ) : (
        <div className="categories-grid">
          {campaigns.map(c => (
            <div className="category-card" key={c.id}>
              <div className="cat-info">
                <h3>{c.name}</h3>
                <span className="cat-count" style={{ color: '#10B981' }}>{c.status}</span>
              </div>
              <button className="btn-icon" onClick={() => setCampaigns(campaigns.filter(item => item.id !== c.id))}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdCampaign