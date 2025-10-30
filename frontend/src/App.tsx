
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ListingDetails from './pages/ListingDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import VendorDashboard from './pages/VendorDashboard';
import AdminModeration from './pages/AdminModeration';
<<<<<<< HEAD
=======
import About from './pages/About';
>>>>>>> ef3ca6a (Initial commit)

export default function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminModeration />} />
          <Route path="*" element={<Navigate to='/' />} />
<<<<<<< HEAD
=======
          <Route path="/about" element={<About />} />
>>>>>>> ef3ca6a (Initial commit)
        </Routes>
      </div>
    </div>
  );
}
