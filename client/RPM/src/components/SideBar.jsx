import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS-Styles/SideBar.css";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState({});
  const navigate = useNavigate(); // Importante para redirigir

  const toggleDropdown = (category) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCategoryClick = (category) => {
    // Redirige al usuario a la ruta deseada
    navigate(`/product/${category}`);
  };

  const categories = {
    Motor: [
      "Pistones",
      "Cilindros",
      "Juntas",
      "Cigüeñal",
      "Bielas",
      "Cadenas-de-distribución",
    ],
    Transmision: [
      "Cajas-de-cambio",
      "Embragues",
      "Cadenas-y-Correas",
      "Piñones",
      "Ejes-de-transmisión",
      "Poleas",
      "Rodamientos",
      "Transmision-varios",
    ],
    "Suspension y Direccion": [
      "Amortiguadores",
      "Horquillas",
      "Resortes",
      "Manillares",
      "Rodamientos-de-dirección",
      "Suspension-y-direccion-varios",
    ],
    Frenos: [
      "Pastillas-de-freno",
      "Discos-de-freno",
      "Cilindros-maestros",
      "Zapatas",
      "Accesorios-de-freno",
    ],
    "Ruedas y Neumaticos": [
      "Neumáticos",
      "Llantas",
      "Cámaras-de-aire",
      "Válvulas",
      "Rayos-y-Niples",
      "Accesorios-de-rueda",
    ],
    Escape: ["Silenciadores", "Colectores", "Tuberías", "Escape-varios"],
    Carroserias: [
      "Carcasas",
      "Guardabarros",
      "Tanques-de-gasolina",
      "Cubiertas-laterales",
      "Baúles",
      "Asientos",
      "Cascos",
      "Accesorios-varios",
    ],
    "Iluminacion y Electronica": [
      "Baterías",
      "Alarmas",
      "GPS",
      "Faros",
      "Luces-traseras",
      "Intermitentes",
      "Luces-LED",
      "Iluminacion-varios",
      "Electronica-varios",
    ],
    Otros: [
      "Herramientas",
      "Lubricantes-y-aceites",
      "Limpieza",
      "Filtros",
      "Kits-de-reparación",
      "Bicicletas",
    ],
  };

  return (
    <div className="sidenav">
      <h3 className="title">Categorías</h3>
      <ul className="Category-list-container">
        {Object.entries(categories).map(([category, items]) => (
          <div className="dropdown-container" key={category}>
            <li className="category-title">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown(category)}
              >
                {category}
                <i className="fa fa-caret-down"></i>
              </button>
            </li>
            <div
              className="dropdown-content-sidebar"
              style={{
                display: openDropdown[category] ? "block" : "none",
              }}
            >
              {items.map((item) => (
                <a
                  key={item}
                  onClick={() => handleCategoryClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; 