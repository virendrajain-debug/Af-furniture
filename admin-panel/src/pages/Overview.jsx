// ============================================================
// Dashboard Overview Component
// ============================================================
// Shows key statistics and recent enquiries.
// Fetches data from GET /api/dashboard (requires auth token).
//
// DISPLAYS:
//   - 6 stat cards: Categories, Products, Enquiries, In Stock, Out of Stock, Contact Enquiries
//   - Recent enquiries table with status badges
// ============================================================

import { useEffect, useState } from 'react'

function Overview({ token }) {
  const [stats, setStats] = useState(null)
  const [enquiries, setEnquiries] = useState([])

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setStats(data.stats)
        setEnquiries(data.recentEnquiries || [])
      } catch {
        console.error('Failed to fetch dashboard data')
      }
    }
    fetchData()
  }, [token])

  // Stat card configurations with SVG icons
  const counters = [
    { label: 'Total Category', value: stats?.totalCategories ?? '...', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Total Products', value: stats?.totalProducts ?? '...', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Total Enquiry', value: stats?.totalEnquiries ?? '...', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { label: 'Total In Stock Product', value: stats?.inStockProducts ?? '...', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Out of Stock Product', value: stats?.outOfStockProducts ?? '...', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
    { label: 'Total Contact Enquiry', value: stats?.contactEnquiries ?? '...', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  return (
    <div className="overview">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, here's what's happening today</p>
      </div>

      {/* Stats Cards Grid */}
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

      {/* Recent Enquiries Table */}
      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Enquiries</h2>
          <p>Customer enquiries received</p>
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
              {enquiries.length > 0 ? enquiries.map((q) => (
                <tr key={q.id}>
                  <td className="order-id">{q.id}</td>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.product_name || '-'}</td>
                  <td>{q.message || '-'}</td>
                  <td>{new Date(q.created_at).toLocaleDateString()}</td>
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
