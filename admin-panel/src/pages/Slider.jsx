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
        <button className="btn-primary" onClick={() => openModal()} style={{ color: '#fff', fontWeight: 'bold' }}>+ Add Banner</button>
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
              <td style={{ color: s.isActive ? '#10B981' : '#888', fontWeight: '500' }}>{s.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="btn-icon" onClick={() => openModal(s)} style={{ marginRight: '10px' }}>Edit</button>
                <button className="btn-icon" onClick={() => setSliders(sliders.filter(item => item.id !== s.id))} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#333' }}>{form.id ? 'Edit Banner' : 'Add New Banner'}</h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: '#555' }}>Banner Name</label>
                <input type="text" placeholder="Enter banner name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ padding: '12px', width: '100%', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} />
              </div>

              {/* Styled File Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: '#555' }}>Upload Image</label>
                <label style={{ display: 'block', background: '#3B82F6', color: '#fff', padding: '12px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}>
                  {form.image ? 'Change Image' : 'Choose File'}
                  <input type="file" accept="image/*" onChange={e => e.target.files[0] && setForm({...form, image: URL.createObjectURL(e.target.files[0])})} style={{ display: 'none' }} />
                </label>
                {form.image && (
                  <img src={form.image} alt="preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginTop: '12px', border: '1px solid #eee' }} />
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '10px 0' }} onClick={() => setForm({...form, isActive: !form.isActive})}>
                <div style={{ width: '44px', height: '24px', background: form.isActive ? '#10B981' : '#cbd5e1', borderRadius: '12px', position: 'relative', transition: '0.3s' }}>
                  <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: form.isActive ? '23px' : '3px', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                </div>
                <span style={{ fontWeight: '500', color: '#333' }}>Set as Active Banner</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, padding: '12px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Save Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Slider