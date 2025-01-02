import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import React from 'react';
import '../CSS Styles/Menu.css';
import MessagesSideBar from "./MessagesSideBar";


const Menu = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        const isConfirmed = window.confirm("¿Estás seguro que deseas cerrar sesion?");
        if (isConfirmed) {
        // Eliminar los tokens del localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    
        // Limpiar los encabezados de Axios
        delete Axios.defaults.headers['Authorization'];
    
        // Redirigir al usuario a la página de login
        navigate('/login');}
      };


    return(
        <div className="menu-container">
            <div>
                <MessagesSideBar></MessagesSideBar>
            </div>
            <div className="link-menu">
                <Link to="/productForm" className="link"> Agregar Producto</Link>
                <Link to="/editProduct" className="link"> Editar o eliminar un producto</Link>
                <Link to="/register" className="link"> Crear usuario</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
           </div>
        </div>
    )
}

export default Menu;