import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Products from './Component/Pages/Products';
import CreateAccount from './Component/Pages/CreateAccount';
import Order from './Component/Pages/Order';
import Cart from './Component/Pages/Cart';
import AdminLogin from './Component/Pages/adminLogin';
import Login from './Component/Pages/Login';
import Footer from './Component/Footer';
import { CartProvider } from './Component/CartContext';
import { AuthProvider } from './Component/auth';
import './App.css';
import logo from './fierce__-removebg-preview.png';
import AdminDashboard from './Component/Pages/adminDashboard';

// Import product images manually
import productImage1 from './images/pic1.jpg';
import productImage2 from './images/pic2.jpg';
import productImage3 from './images/pic3.jpg';
import productImage4 from './images/pic4.jpg';

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 10,
      image: productImage1, // Manually assign the imported image
    },
    {
      id: 2,
      name: 'Product 2',
      price: 150,
      stock: 5,
      image: productImage2, // Manually assign the imported image
    },
    {
      id: 3,
      name: 'Product 3',
      price: 200,
      stock: 8,
      image: productImage3, // Manually assign the imported image
    },
    {
      id: 4,
      name: 'Product 4',
      price: 250,
      stock: 2,
      image: productImage4, // Manually assign the imported image
    },
  ]);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleSearch = () => {
    // Implement search functionality if needed
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <header className="App-header">
            <div className="left-section">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="search-bar">
              <input className="active" type="text" placeholder="Search..." />
              <button onClick={handleSearch}>Search</button>
            </div>
          </header>

          <Navbar />
          <Routes>
            <Route path="/products" element={<Products products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin-dashboard" 
              element={isAdmin ? <AdminDashboard products={products} /> : <Navigate to="/products" />} 
            />
            <Route path="/" element={<Navigate to={isAdmin ? "/admin-dashboard" : "/products"} />} />
            <Route path="*" element={<Navigate to={isAdmin ? "/admin-dashboard" : "/products"} />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
