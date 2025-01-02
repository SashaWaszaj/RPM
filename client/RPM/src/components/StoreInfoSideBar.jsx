import React, { useState } from "react";
import "../CSS Styles/SideBar.css";
import { Link, useLocation } from "react-router-dom";

const StoreInfoSideBar = () => {
  const location = useLocation(); // Obtiene la ubicación actual
  const [activePath, setActivePath] = useState(location.pathname); // Estado para la ruta activa

  // Función para manejar el cambio de botón activo
  const handleButtonClick = (path) => {
    setActivePath(path);
  };

  return (
    <div className="sidenav">
      <ul className="Category-list-container-store-info">
        <div className="dropdown-container-store-info">
          <li className="category-title">
            <Link to="/la-empresa">
              <button
                className={`dropdown-btn-2 ${
                  activePath === "/la-empresa" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("/la-empresa")}
              >
                La empresa
              </button>
            </Link>
          </li>
          <li className="category-title">
            <Link to="/contacto">
              <button
                className={`dropdown-btn-2 ${
                  activePath === "/contacto" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("/contacto")}
              >
                Contacto
              </button>
            </Link>
          </li>
          <li className="category-title">
            <Link to="/ubicacion">
              <button
                className={`dropdown-btn-2 ${
                  activePath === "/ubicacion" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("/ubicacion")}
              >
                Ubicación
              </button>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default StoreInfoSideBar;
