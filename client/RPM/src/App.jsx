import NavBar from './components/NavBar';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from './components/productForm';
import ProductList from './components/ProductList';
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Axios from 'axios';
import PrivateRoute from './components/PrivateRoute'; // Importa el componente PrivateRoute
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Recupera el token y refresh token del localStorage
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    // Configura los headers con el token directamente en Axios
    if (token) {
      Axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  
    // Interceptor para verificar la respuesta de las solicitudes y gestionar el refresh token
    Axios.interceptors.response.use(
      response => response,  // Si la respuesta es exitosa, la pasa sin modificar
      async (error) => {
        const originalRequest = error.config;
  
        // Verifica si el error es debido a un token expirado
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
  
          try {
            // Intenta refrescar el token con el refresh token
            const response = await Axios.post('http://localhost:8080/api/auth/refreshToken', { refreshToken });
            const newToken = response.data.accessToken;
  
            // Actualiza el token en el localStorage
            localStorage.setItem('accessToken', newToken);
  
            // Actualiza los headers y reintenta la solicitud original
            Axios.defaults.headers['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
  
            return Axios(originalRequest);  // Reintenta la solicitud original con el nuevo token
          } catch (error) {
            console.error("Error al refrescar el token", error);
            // Si no se puede refrescar el token, redirige al login o haz lo necesario
          }
        }
        return Promise.reject(error);  // Si no es un error de autenticación, rechaza el error
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <NavBar setSelectedCategory={setSelectedCategory} />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route 
          path="/product/:category" 
          element={<ProductList selectedCategory={selectedCategory} />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/:code" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Rutas protegidas */}
        <Route 
          path="/productForm" 
          element={<PrivateRoute element={<ProductForm />} />} 
        />
        <Route 
          path="/menu" 
          element={<PrivateRoute element={<Menu />} />} 
        />
        <Route 
          path="/editProduct" 
          element={<PrivateRoute element={<EditProduct />} />} 
        />
        <Route 
          path="/register" 
          element={<PrivateRoute element={<Register />}/>} 
        />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;




