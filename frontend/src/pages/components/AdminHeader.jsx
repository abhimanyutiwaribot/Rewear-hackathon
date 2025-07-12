import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [notifications] = useState(3); // Example notification count
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <header style={{
      background: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input
          type="search"
          placeholder="Search..."
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #e1e8ed',
            width: '300px',
            fontSize: '0.9rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#e74c3c',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '0.75rem'
          }}>
            {notifications}
          </span>
          <span style={{ fontSize: '1.2rem' }}>🔔</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <p style={{ margin: 0, color: '#2c3e50', fontWeight: 500 }}>
              {admin.name || 'Admin User'}
            </p>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.8rem' }}>
              {admin.email || 'admin@rewear.com'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: 'none',
              background: '#e74c3c',
              color: 'white',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
