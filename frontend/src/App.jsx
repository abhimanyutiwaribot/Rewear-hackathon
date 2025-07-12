
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BrowseItems from './components/BrowseItems';
import Dashboard from './components/Dashboard';
import ItemDetail from './components/ItemDetail';
import AddItem from './components/AddItem';
import AdminPanel from './components/AdminPanel';
import AuthPage from './components/AuthPage';
import { UserProvider } from './context/UserContext';
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
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}


export default App
