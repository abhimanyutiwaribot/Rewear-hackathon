function ItemDetail() {
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
        }}>Item Title</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            border: '1px solid #e0e7ff',
            width: 300,
            height: 220,
            borderRadius: '1rem',
            background: '#f1f5fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <span style={{ color: '#64748b' }}>Image Gallery</span>
          </div>
          <p style={{ color: '#475569', margin: '0.5em 0' }}>
            <b>Description:</b> Full item description goes here.
          </p>
          <p style={{ color: '#475569', margin: 0 }}>
            <b>Uploader:</b> [Uploader Name]
          </p>
          <p style={{ color: '#475569', margin: '0.5em 0 1.5em 0' }}>
            <b>Status:</b> <span style={{ color: '#22c55e' }}>Available</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button style={{
              background: '#6366f1',
              color: '#fff',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              padding: '0.7em 1.5em',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Swap Request</button>
            <button style={{
              background: '#fff',
              color: '#6366f1',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              padding: '0.7em 1.5em',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Redeem via Points</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
