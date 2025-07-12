function AdminPanel() {
  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem 0',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 700,
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
        }}>Admin Panel</h2>
        <div>
          <h3 style={{ color: '#3730a3', fontSize: '1.1rem', marginBottom: '1em' }}>Moderate Item Listings</h3>
          <ul style={{ listStyle: 'none', padding: 0, color: '#475569' }}>
            <li style={{
              background: '#f1f5fd',
              borderRadius: '1rem',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Item 1</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  background: '#22c55e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Approve</button>
                <button style={{
                  background: '#fbbf24',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Reject</button>
                <button style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Remove</button>
              </div>
            </li>
            <li style={{
              background: '#f1f5fd',
              borderRadius: '1rem',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Item 2</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  background: '#22c55e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Approve</button>
                <button style={{
                  background: '#fbbf24',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Reject</button>
                <button style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5em 1em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
