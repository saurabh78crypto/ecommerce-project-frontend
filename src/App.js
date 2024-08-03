import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = localStorage.getItem('role');
      const email = localStorage.getItem('email');
      setIsLoggedIn(true);
      setIsAdmin(userRole === 'superadmin');
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserEmail('');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} userEmail={userEmail} />
      <Routes>
        <Route path="/" element={<ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setUserEmail={setUserEmail} />} />
        <Route path="/products" element={<ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/add-product" element={isAdmin ? <AddProduct /> : <ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
      </Routes>
    </Router>
  );
};

export default App;
