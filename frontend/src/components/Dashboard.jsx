import { useState, useEffect } from 'react';
import { getUserProfile, getUserItems } from '../services/api';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profile, items] = await Promise.all([
          getUserProfile(),
          getUserItems()
        ]);
        setUserData(profile);
        setUserItems(items);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleListingClick = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data found</div>;

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
          {/* Profile Section */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>Profile Details</h3>
            <p style={{ color: '#475569', margin: '0.7em 0 0 0' }}>Name: <b>{userData.name}</b></p>
            <p style={{ color: '#475569', margin: 0 }}>Points Balance: <b>{userData.points}</b></p>
            <p style={{ color: '#475569', margin: 0 }}>Email: <b>{userData.email}</b></p>
          </div>

          {/* Listings Section */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: '#f1f5fd',
            borderRadius: '1rem',
            padding: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60,60,120,0.04)'
          }}>
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>My Listings</h3>
            {userItems.length === 0 ? (
              <p style={{ color: '#64748b', margin: '0.7em 0 0 0' }}>No items listed yet.</p>
            ) : (
              <ul style={{ color: '#475569', margin: '0.7em 0 0 1em', padding: 0 }}>
                {userItems.map((item) => (
                  <li key={item._id} style={{ marginBottom: '0.7em', cursor: 'pointer' }} onClick={() => handleListingClick(item)}>
                    <b>{item.title}</b>
                    {item.images && item.images.length > 0 && (
                      <div style={{ marginTop: 4 }}>
                        <img 
                          src={`${process.env.REACT_APP_API_URL}${item.images[0]}`} 
                          alt={item.title} 
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} 
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            
            {/* Modal for item details */}
            {selectedItem && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }} onClick={closeModal}>
                <div style={{
                  background: '#fff',
                  borderRadius: '1.2rem',
                  padding: '2rem 2.2rem',
                  minWidth: 320,
                  maxWidth: 400,
                  boxShadow: '0 2px 16px 0 rgba(60,60,120,0.13)',
                  position: 'relative'
                }} onClick={e => e.stopPropagation()}>
                  <button onClick={closeModal} style={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    background: 'none',
                    border: 'none',
                    fontSize: 22,
                    color: '#6366f1',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}>&times;</button>
                  <h2 style={{ color: '#6366f1', marginBottom: 12 }}>{selectedItem.title}</h2>
                  {selectedItem.images && selectedItem.images.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      {selectedItem.images.map((src, idx) => (
                        <img key={idx} src={src} alt={selectedItem.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      ))}
                    </div>
                  )}
                  <div style={{ color: '#475569', fontSize: 15 }}>
                    <p><b>Description:</b> {selectedItem.description}</p>
                    <p><b>Category:</b> {selectedItem.category}</p>
                    <p><b>Brand:</b> {selectedItem.type}</p>
                    <p><b>Size:</b> {selectedItem.size}</p>
                    <p><b>Condition:</b> {selectedItem.condition}</p>
                    <p><b>Tags:</b> {selectedItem.tags}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Purchases Section - Update to use real data */}
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
            <h3 style={{ color: '#3730a3', margin: 0, fontSize: '1.1rem' }}>My Purchases</h3>
            {userData.purchases && userData.purchases.length > 0 ? (
              <ul style={{ color: '#475569', margin: '0.7em 0 0 1em', padding: 0 }}>
                {userData.purchases.map((item) => (
                  <li key={item._id} style={{ marginBottom: '0.7em' }}>
                    <b>{item.title}</b>
                    {item.images && item.images.length > 0 && (
                      <div style={{ marginTop: 4 }}>
                        <img 
                          src={`${process.env.REACT_APP_API_URL}${item.images[0]}`} 
                          alt={item.title} 
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} 
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#64748b', margin: '0.7em 0 0 0' }}>No purchases yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
