import { useEffect, useState } from "react";
import axios from "axios";

const PendingItems = () => {
  const [items, setItems] = useState([]); // ✅ start as array

  const fetchPendingItems = async () => {
    try {
      const res = await axios.get("/api/admin/listings?status=pending", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Fetched items:", res.data);
      setItems(res.data); // ✅ should be array
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const handleAction = async (id, action) => {
  try {
    const endpoint = action === "approve"
      ? `/api/admin/approve/${id}`
      : `/api/admin/reject/${id}`;
      
    await axios.put(endpoint, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    // Refresh the list
    fetchPendingItems();
  } catch (err) {
    console.error(`Error during ${action}:`, err);
  }
};



  return (
    <div>
      <h1 style={{
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '2rem',
        borderBottom: '3px solid #3498db',
        paddingBottom: '0.5rem'
      }}>Pending Items</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map(item => (
            <div key={item._id} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e1e8ed',
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                color: '#2c3e50',
                marginBottom: '1rem'
              }}>{item.title}</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '1rem'
              }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.875rem',
                  backgroundColor: '#e1f5fe',
                  color: '#0288d1'
                }}>Pending Review</span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  cursor: 'pointer'
                }} onClick={() => handleAction(item._id, "approve")}>Approve</button>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#f44336',
                  color: 'white',
                  cursor: 'pointer'
                }} onClick={() => handleAction(item._id, "reject")}>Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{
            textAlign: 'center',
            color: '#7f8c8d',
            fontSize: '1.1rem'
          }}>No pending items.</p>
        )}
      </div>
    </div>
  );
};

export default PendingItems;
