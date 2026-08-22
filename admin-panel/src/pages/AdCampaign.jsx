import { useState } from 'react'

function AdCampaign() {
  const [ads, setAds] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ id: null, title: '', image: null, link: '', isActive: false })
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => { 
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000) 
  }

  const openModal = (ad = { id: null, title: '', image: null, link: '', isActive: false }) => {
    setForm(ad)
    setModal(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.image || !form.link.trim()) {
      return showToast('Name, Image, and Link are required', 'warning')
    }
    
    let updated = [...ads]
    
    if (form.id) {
      updated = updated.map(a => a.id === form.id ? form : a) // Edit existing
    } else {
      updated = [...updated, { ...form, id: Date.now() }] // Add new
    }
    
    setAds(updated)
    setModal(false)
    showToast('Ad Campaign saved', 'success')
  }

  const toggle = (id) => {
    setAds(ads.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a))
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><h2>Ad Campaign</h2><p>Manage advertisement banners and links</p></div>
        <button className="btn-primary" onClick={() => openModal()} style={{ color: '#fff', fontWeight: 'bold' }}>+ Add Campaign</button>
      </div>

      <table style={{ width: '100%', textAlign: 'left', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th>S.No</th>
            <th>Ad Name</th>
            <th>Image</th>
            <th>Target Link</th>
            <th>Toggle Status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((a, index) => (
            <tr key={a.id} style={{ borderBottom: '1px solid #eee', height: '60px' }}>
              <td>{index + 1}</td>
              <td>{a.title}</td>
              <td><img src={a.image} alt="ad banner" style={{ width: '80px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
              
              <td>
                <a href={a.link} target="_blank" rel="noreferrer" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: '500' }}>
                  View Link
                </a>
              </td>

              <td>
                <div onClick={() => toggle(a.id)} style={{ width: '40px', height: '20px', background: a.isActive ? '#10B981' : '#ccc', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: a.isActive ? '22px' : '2px', transition: '0.2s' }} />
                </div>
              </td>
              <td style={{ color: a.isActive ? '#10B981' : '#888', fontWeight: '500' }}>{a.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="btn-icon" onClick={() => openModal(a)} style={{ marginRight: '10px' }}>Edit</button>
                <button className="btn-icon" onClick={() => setAds(ads.filter(item => item.id !== a.id))} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#333' }}>{form.id ? 'Edit Campaign' : 'Add New Campaign'}</h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: '#555' }}>Campaign Name</label>
                <input type="text" placeholder="Enter ad name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ padding: '12px', width: '100%', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: '#555' }}>Redirect Link</label>
                <input type="url" placeholder="https://example.com" value={form.link} onChange={e => setForm({...form, link: e.target.value})} style={{ padding: '12px', width: '100%', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} />
              </div>
              
              {/* Styled File Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', color: '#555' }}>Upload Ad Banner</label>
                <label style={{ display: 'block', background: '#3B82F6', color: '#fff', padding: '12px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}>
                  {form.image ? 'Change Banner Image' : 'Choose File'}
                  <input type="file" accept="image/*" onChange={e => e.target.files[0] && setForm({...form, image: URL.createObjectURL(e.target.files[0])})} style={{ display: 'none' }} />
                </label>
                {form.image && (
                  <img src={form.image} alt="preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginTop: '12px', border: '1px solid #eee' }} />
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px 0' }} onClick={() => setForm({...form, isActive: !form.isActive})}>
                <div style={{ width: '44px', height: '24px', background: form.isActive ? '#10B981' : '#cbd5e1', borderRadius: '12px', position: 'relative', transition: '0.3s' }}>
                  <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: form.isActive ? '23px' : '3px', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                </div>
                <span style={{ fontWeight: '500', color: '#333' }}>Set Campaign Active</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, padding: '12px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Save Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdCampaign