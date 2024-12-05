import './App.css';
import NavBar from './components/NavBar';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from './components/productForm';
import ProductList from './components/ProductList';
import React, { useState } from 'react';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import EditProduct from './components/editProduct';
import ProductDetails from './components/ProductDetails';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <BrowserRouter>
      <NavBar setSelectedCategory={setSelectedCategory}></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route 
          path="/product/:category" 
          element={<ProductList selectedCategory={selectedCategory} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/:code" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


