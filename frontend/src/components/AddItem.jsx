function AddItem() {
  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem 0',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 600,
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 16px 0 rgba(60,60,120,0.08)',
        padding: '2.5rem 2rem'
      }}>
        <h2 style={{
          color: '#6366f1',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Add New Item</h2>
        <form>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Upload Images:
              <input type="file" multiple style={{
                display: 'block',
                marginTop: '0.5em',
                color: '#6366f1'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Title:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Description:
              <textarea style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Category:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Type:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Size:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Condition:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#475569', fontWeight: 500 }}>
              Tags:
              <input type="text" style={{
                display: 'block',
                width: '100%',
                marginTop: '0.5em',
                padding: '0.5em',
                borderRadius: '6px',
                border: '1px solid #e0e7ff'
              }} />
            </label>
          </div>
          <button type="submit" style={{
            background: '#6366f1',
            color: '#fff',
            border: '2px solid #6366f1',
            borderRadius: '8px',
            padding: '0.7em 1.5em',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '1rem'
          }}>Submit Item</button>
        </form>
      </div>
    </div>
  )
}

export default AddItem
