// ============================================================
// About Section Component
// ============================================================
// Displays company information fetched from the API.
// Shows: Company name, tagline, description, address, phone, email.
// ============================================================

import { useState, useEffect } from 'react'

function AboutSection() {
  const [about, setAbout] = useState(null)

  // Fetch about info from API on mount
  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(setAbout)
      .catch(() => {})
  }, [])

  return (
    <section className="about-section" id="about">
      <div className="section-title">
        <span>ABOUT US</span>
        <h2>{about?.company_name || 'AF Furnishings'}</h2>
      </div>
      <div className="about-content">
        <div className="about-text">
          {about?.tagline && <h3>{about.tagline}</h3>}
          <p>{about?.description || 'Quality furniture for every home. We provide comfortable, stylish furniture to make your living spaces complete.'}</p>
          {about?.address && <p><strong>Address:</strong> {about.address}</p>}
          {about?.phone && <p><strong>Phone:</strong> {about.phone}</p>}
          {about?.email && <p><strong>Email:</strong> {about.email}</p>}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
