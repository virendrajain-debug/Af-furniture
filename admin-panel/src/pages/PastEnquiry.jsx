import { useState } from 'react'

function PastEnquiry() {
  const [enquiries] = useState([
    { id: 2, name: 'Aditya Sharma', email: 'aditya@gmail.com', message: 'Delivery time ?', date: 'Aug 18, 2026' }
  ])

  return (
    <div className="categories-page">
      <div className="section-header">
        <h2>Past Enquiries</h2>
        <p>Archive of resolved customer messages</p>
      </div>
      
      {enquiries.length === 0 ? (
        <div className="empty-state"><p>No past enquiries</p></div>
      ) : (
        <div className="categories-grid">
          {enquiries.map(enq => (
            <div className="category-card" key={enq.id} style={{ display: 'block', padding: '20px', opacity: 0.7 }}>
              <h3 style={{ marginBottom: '4px' }}>{enq.name}</h3>
              <span className="cat-count" style={{ display: 'block', marginBottom: '12px' }}>Resolved on {enq.date}</span>
              <p style={{ fontSize: '15px' }}>"{enq.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PastEnquiry