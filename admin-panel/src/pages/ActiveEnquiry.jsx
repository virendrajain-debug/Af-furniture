import { useState } from 'react'

function ActiveEnquiry() {
  const [toast, setToast] = useState(null)
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: 'Ronak Prajapati', email: 'ronak@gmail.com', message: 'Bulk order possible?' }
  ])

  const handleResolve = (id) => {
    setEnquiries(enquiries.filter(e => e.id !== id))
    setToast({ msg: 'Enquiry moved to past', type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="categories-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      <div className="section-header">
        <h2>Active Enquiries</h2>
        <p>Manage unresolved customer messages</p>
      </div>
      
      {enquiries.length === 0 ? (
        <div className="empty-state"><p>No active enquiries</p></div>
      ) : (
        <div className="categories-grid">
          {enquiries.map(enq => (
            <div className="category-card" key={enq.id} style={{ display: 'block', padding: '20px' }}>
              <h3 style={{ marginBottom: '8px' }}>{enq.name}</h3>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>{enq.email}</p>
              <p style={{ fontSize: '15px', marginBottom: '16px' }}>"{enq.message}"</p>
              <button className="btn-primary" onClick={() => handleResolve(enq.id)}>Mark as Resolved</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveEnquiry