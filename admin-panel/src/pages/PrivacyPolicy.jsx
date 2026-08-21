import { useState } from 'react'

function PrivacyPolicy() {
  const [content, setContent] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = () => {
    showToast('Privacy Policy saved', 'success')
  }

  return (
    <div className="terms-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="section-header">
        <h2>Privacy Policy</h2>
        <p>Edit and update how you handle customer data</p>
      </div>

      <div className="editor-container">
        <div className="editor-toolbar">
          <button className="toolbar-btn" title="Bold"><strong>B</strong></button>
          <button className="toolbar-btn" title="Italic"><em>I</em></button>
          <button className="toolbar-btn" title="Underline"><u>U</u></button>
          <span className="toolbar-divider" />
          <button className="toolbar-btn" title="Heading">H1</button>
          <button className="toolbar-btn" title="Subheading">H2</button>
        </div>

        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="20"
          placeholder="Enter privacy policy content here..."
        />

        <div className="editor-actions">
          <button className="btn-secondary">Preview</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy