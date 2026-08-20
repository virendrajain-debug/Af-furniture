import { useState } from 'react'

function Slider() {
  const [sliders, setSliders] = useState([])
  const [title, setTitle] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim()) return showToast('Enter slider title', 'warning')
    setSliders([...sliders, { id: Date.now(), title }])
    setTitle('')
    showToast('Banner added to slider', 'success')
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Slider (Banner)</h2>
        <p>Upload homepage banners and promotional images</p>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input type="text" placeholder="Banner Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="file" accept="image/*" style={{ padding: '8px' }} />
        <button type="submit" className="btn-primary">Upload Banner</button>
      </form>

      {sliders.length === 0 ? (
        <div className="empty-state"><p>No banners uploaded yet</p></div>
      ) : (
        <div className="categories-grid">
          {sliders.map(s => (
            <div className="category-card" key={s.id}>
              <h3>{s.title}</h3>
              <button className="btn-icon" onClick={() => setSliders(sliders.filter(item => item.id !== s.id))}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Slider