function Dashboard() {
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
        }}>User Dashboard</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
          justifyContent: 'space-between'
        }}>
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>Profile Details</h3>
            <p style={{ color: '#475569', margin: '0.7em 0 0 0' }}>Name: <b>[User Name]</b></p>
            <p style={{ color: '#475569', margin: 0 }}>Points Balance: <b>[Points]</b></p>
          </div>
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>Uploaded Items</h3>
            <ul style={{ color: '#475569', margin: '0.7em 0 0 1em', padding: 0 }}>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'space-between'
        }}>
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>Ongoing Swaps</h3>
            <ul style={{ color: '#475569', margin: '0.7em 0 0 1em', padding: 0 }}>
              <li>Swap 1</li>
            </ul>
          </div>
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>Completed Swaps</h3>
            <ul style={{ color: '#475569', margin: '0.7em 0 0 1em', padding: 0 }}>
              <li>Swap 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
