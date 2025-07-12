import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Sidebar on the left */}
      <div style={{ width: '250px', background: '#fff', boxShadow: '2px 0 5px rgba(0,0,0,0.05)' }}>
        <AdminSidebar />
      </div>

      {/* Right section: header + main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        {/* Header at the top */}
        <AdminHeader />

        {/* Main content area */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          background: '#f1f4f9'
        }}>
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
          }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
