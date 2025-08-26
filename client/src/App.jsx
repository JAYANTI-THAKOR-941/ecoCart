import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './admin/AdminDashboard';
import ProductList from './admin/ProductList';
import ProductForm from './admin/ProductForm';
import UserList from './admin/UserList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/product-management" element={<ProductList/>} />
        <Route path="/add" element={<ProductForm/>} />
        <Route path="/edit/:id" element={<ProductForm/>} />
        <Route path="/users" element={<UserList/>} />

      </Routes>
    </>
  );
}

export default App;
