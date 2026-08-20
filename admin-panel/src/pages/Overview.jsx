function Overview() {
  const counters = [
    { label: 'Total Category', value: '0', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Total Products', value: '0', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Total Enquiry', value: '0', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { label: 'Total In Stock Product', value: '0', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Out of Stock Product', value: '0', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
    { label: 'Total Contact Enquiry', value: '0', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  const queries = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', product: 'Wooden Sofa Set', message: 'Is this available in walnut finish?', date: '20 Aug 2026', status: 'pending' },
    { id: 2, name: 'Priya Verma', email: 'priya@gmail.com', product: 'Oak Dining Table', message: 'Can I get custom dimensions?', date: '20 Aug 2026', status: 'replied' },
    { id: 3, name: 'Amit Kumar', email: 'amit@gmail.com', product: 'Bedside Table', message: 'What is the delivery time?', date: '19 Aug 2026', status: 'pending' },
  ]

  return (
    <div className="overview">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, here's what's happening today</p>
      </div>

      <div className="counters-grid">
        {counters.map((c) => (
          <div className="counter-card" key={c.label}>
            <div className="counter-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={c.icon} />
              </svg>
            </div>
            <div className="counter-info">
              <span className="counter-label">{c.label}</span>
              <span className="counter-value">{c.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Today's Queries</h2>
          <p>Customer enquiries received today</p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {queries.length > 0 ? queries.map((q) => (
                <tr key={q.id}>
                  <td className="order-id">{q.id}</td>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.product}</td>
                  <td>{q.message}</td>
                  <td>{q.date}</td>
                  <td>
                    <span className={`status-badge ${q.status}`}>
                      {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p>No queries yet</p>
                      <span>Customer enquiries will appear here once they start coming in</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Overview
