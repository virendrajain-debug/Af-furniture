import { useState } from 'react'

function Slider() {
  const [sliders, setSliders] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ id: null, title: '', image: null, isActive: false })
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const openModal = (banner = { id: null, title: '', image: null, isActive: false }) => {
    setForm(banner)
    setModal(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.image) return showToast('Title and Image required', 'warning')
    
    // If setting to active, turn all others off
    let updated = form.isActive ? sliders.map(s => ({ ...s, isActive: false })) : [...sliders]
    
    if (form.id) {
      updated = updated.map(s => s.id === form.id ? form : s) // Edit existing
    } else {
      updated = [...updated, { ...form, id: Date.now() }] // Add new
    }
    
    setSliders(updated)
    setModal(false)
    showToast('Banner saved', 'success')
  }

  const toggle = (id) => {
    setSliders(sliders.map(s => s.id === id ? { ...s, isActive: !s.isActive } : { ...s, isActive: false }))
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><h2>Slider (Banner)</h2><p>Manage homepage banners</p></div>
        <button className="btn-primary" onClick={() => openModal()}>+ Add Banner</button>
      </div>

      <table style={{ width: '100%', textAlign: 'left', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th>S.No</th><th>Slider Name</th><th>Banner</th><th>Sider (Toggle)</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliders.map((s, index) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee', height: '60px' }}>
              <td>{index + 1}</td>
              <td>{s.title}</td>
              <td><img src={s.image} alt="banner" style={{ width: '80px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
              <td>
                <div onClick={() => toggle(s.id)} style={{ width: '40px', height: '20px', background: s.isActive ? '#10B981' : '#ccc', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: s.isActive ? '22px' : '2px', transition: '0.2s' }} />
                </div>
              </td>
              <td style={{ color: s.isActive ? '#10B981' : '#888' }}>{s.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="btn-icon" onClick={() => openModal(s)} style={{ marginRight: '10px' }}>Edit</button>
                <button className="btn-icon" onClick={() => setSliders(sliders.filter(item => item.id !== s.id))} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '350px' }}>
            <h3>{form.id ? 'Edit Banner' : 'Add New Banner'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input type="text" placeholder="Banner Name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ padding: '8px', width: '100%' }} />
              <input type="file" accept="image/*" onChange={e => e.target.files[0] && setForm({...form, image: URL.createObjectURL(e.target.files[0])})} />
              

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setForm({...form, isActive: !form.isActive})}>
                <div style={{ width: '40px', height: '20px', background: form.isActive ? '#10B981' : '#ccc', borderRadius: '10px', position: 'relative' }}>
                  <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: form.isActive ? '22px' : '2px', transition: '0.2s' }} />
                </div>
                <span>Set as Active</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, padding: '8px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '8px' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Slider