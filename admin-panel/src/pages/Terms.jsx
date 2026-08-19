import { useState } from 'react'

function Terms() {
  const [content, setContent] = useState('')

  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = () => {
    showToast('Terms & Conditions saved', 'success')
  }

  return (
    <div className="terms-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Terms & Conditions</h2>
        <p>Edit and update your store's terms whenever needed</p>
      </div>

      <div className="editor-container">
        <div className="editor-toolbar">
          <button className="toolbar-btn" title="Bold">
            <strong>B</strong>
          </button>
          <button className="toolbar-btn" title="Italic">
            <em>I</em>
          </button>
          <button className="toolbar-btn" title="Underline">
            <u>U</u>
          </button>
          <span className="toolbar-divider" />
          <button className="toolbar-btn" title="Heading">
            H1
          </button>
          <button className="toolbar-btn" title="Subheading">
            H2
          </button>
          <span className="toolbar-divider" />
          <button className="toolbar-btn" title="Bullet List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button className="toolbar-btn" title="Numbered List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </button>
        </div>

        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="20"
        />

        <div className="editor-actions">
          <button className="btn-secondary">Preview</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default Terms
