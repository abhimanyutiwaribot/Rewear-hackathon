
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BrowseItems from './components/BrowseItems';
import Dashboard from './components/Dashboard';
import ItemDetail from './components/ItemDetail';
import AddItem from './components/AddItem';
import AuthPage from './components/AuthPage';
import AdminDashboard from './pages/Admin/AdminDashboard'
import PendingItems from './pages/Admin/PendingItems'
import { UserProvider } from './context/UserContext';
import Users from './pages/Admin/Users'
import Swaps from './pages/Admin/Swaps'

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="pending-items" element={<PendingItems />} />
          <Route path="users" element={<Users />} />
          <Route path="swaps" element={<Swaps />} />
        </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}


export default App
