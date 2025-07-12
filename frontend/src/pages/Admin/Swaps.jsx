import { useEffect, useState } from "react";
import axios from "axios";

const Swaps = () => {
  const [swaps, setSwaps] = useState([]);

  const fetchSwaps = async () => {
    try {
      const res = await axios.get("/api/admin/swaps", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("Swaps API Response:", res.data);

      const data = res.data;
      if (Array.isArray(data)) {
        setSwaps(data);
      } else if (Array.isArray(data.swaps)) {
        setSwaps(data.swaps);
      } else {
        console.warn("Unexpected swaps format:", data);
        setSwaps([]);
      }
    } catch (err) {
      console.error("Error fetching swaps:", err);
      setSwaps([]);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  return (
    <div>
      <h1 style={{
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '2rem',
        borderBottom: '3px solid #9b59b6',
        paddingBottom: '0.5rem'
      }}>All Swaps</h1>

      <div style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {Array.isArray(swaps) && swaps.length > 0 ? (
          swaps.map(swap => (
            <div key={swap._id} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e1e8ed',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{ borderRight: '1px solid #eee', padding: '0 1rem' }}>
                <h3 style={{
                  color: '#34495e',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem'
                }}>{swap.item?.title}</h3>
              </div>
              <div style={{ padding: '0 1rem' }}>
                <p style={{ color: '#7f8c8d', marginBottom: '0.25rem' }}>
                  <strong>Requester:</strong> {swap.requester?.name}
                </p>
                <p style={{ color: '#7f8c8d' }}>
                  <strong>Owner:</strong> {swap.owner?.name}
                </p>
              </div>
              <div style={{
                justifySelf: 'end',
                padding: '0 1rem'
              }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  backgroundColor: swap.status === 'pending' ? '#fff3e0' : '#e8f5e9',
                  color: swap.status === 'pending' ? '#f57c00' : '#2e7d32'
                }}>{swap.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#7f8c8d" }}>No swaps found.</p>
        )}
      </div>
    </div>
  );
};

export default Swaps;
