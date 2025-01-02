import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../CSS Styles/NavBar.css';
import logo from '../img/RPM.png';


const NavBar = ({ setSelectedCategory }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
    const [openDropdown, setOpenDropdown] = useState({});

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen); // Cambia el estado del menú
    };

    const toggleDropdown = (category) => {
        setOpenDropdown((prev) => ({
          ...prev,
          [category]: !prev[category],
        }));
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
    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`/product/${category}`);
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value); // Actualiza el estado con el valor de búsqueda
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        if (query) {
            // Aquí redirigimos a la página de resultados con el término de búsqueda
            navigate(`/search?query=${query}`);
        }
    };

    const whatsappLinkMayorista = `https://wa.me/595985172178?text=${encodeURIComponent(
         "Hola, quiero más información sobre sus precios mayoristas."
      )}`;
      const whatsappLink = `https://wa.me/595985172178?text=${encodeURIComponent(
        "Hola, quiero más información."
     )}`;

    return (
        <header className='header'>
            <div className='top-header'>
                <div>
                    <ul className='information-list'>
                        <li className='information-list-item'><a href={whatsappLink} target="_blank" ><i className="fa fa-whatsapp" aria-hidden="true"></i><span className='info-links-text'>+595 985 172178</span></a></li>
                        <li className='information-list-item'><Link to='/ubicacion'><i className="fa fa-map-marker" aria-hidden="true"></i><span className='info-links-text'>Ubicación</span></Link></li>
                        <li className='information-list-item'><Link to='/contacto'><i className="fa fa-envelope" aria-hidden="true"></i><span className='info-links-text'>Contacto</span></Link></li>
                        <li className='information-list-item'><Link to='/la-empresa'><i className="fa fa-home" aria-hidden="true"></i><span className='info-links-text'>La empresa</span></Link></li>
                    </ul>
                </div>
                <div className='consulta-precio-mayorista'>
                    <p><a href={whatsappLinkMayorista} target="_blank" >Consulta nuestros <span style={{fontWeight: "bold"}}>precios mayoristas</span></a></p>
                </div>
            </div>
            <div className='bar-principal'>
                <div className='div-logo'>
                    <Link to="/"><img className='logo' src={logo} alt='RPM logo'/></Link>
                </div>
                <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Buscar productos"
                        name="search"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button" type="submit">
                    <i className="fa fa-search"></i>
                    </button>
                </form>
                </div>
                
            </div>
            <div className='categories'>
                <ul>
                    <div className='dropdown'>
                        <li><a className="category-box">Motor <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Pistones")}>Pistones</a>
                                <a onClick={() => handleCategoryClick("Cilindros")}>Cilindros</a>
                                <a onClick={() => handleCategoryClick("Juntas")}>Juntas</a>
                                <a onClick={() => handleCategoryClick("Cigüeñal")}>Cigüeñal</a>
                                <a onClick={() => handleCategoryClick("Bielas")}>Bielas</a>
                                <a onClick={() => handleCategoryClick("Cadenas-de-distribución")}>Cadenas de distribución</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Transmisión <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Cajas-de-cambio")}>Cajas de cambio</a>
                                <a onClick={() => handleCategoryClick("Embragues")}>Embragues</a>
                                <a onClick={() => handleCategoryClick("Cadenas-y-Correas")}>Cadenas y Correas</a>
                                <a onClick={() => handleCategoryClick("Piñones")}>Piñones</a>
                                <a onClick={() => handleCategoryClick("Ejes-de-transmisión")}>Ejes de transmisión</a>
                                <a onClick={() => handleCategoryClick("Poleas")}>Poleas</a>
                                <a onClick={() => handleCategoryClick("Rodamientos")}>Rodamientos</a>
                                <a onClick={() => handleCategoryClick("Transmision-varios")}>Transmision varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Suspensión y Dirección <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Amortiguadores")}>Amortiguadores</a>
                                <a onClick={() => handleCategoryClick("Horquillas")}>Horquillas</a>
                                <a onClick={() => handleCategoryClick("Resortes")}>Resortes</a>
                                <a onClick={() => handleCategoryClick("Manillares")}>Manillares</a>
                                <a onClick={() => handleCategoryClick("Rodamientos-de-dirección")}>Rodamientos de dirección</a>
                                <a onClick={() => handleCategoryClick("Suspension-y-direccion-varios")}>Suspension y direccion varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Frenos <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Pastillas-de-freno")}>Pastillas de freno</a>
                                <a onClick={() => handleCategoryClick("Discos-de-freno")}>Discos de freno</a>
                                <a onClick={() => handleCategoryClick("Cilindros-maestros")}>Cilindros maestros</a>
                                <a onClick={() => handleCategoryClick("Zapatas")}>Zapatas</a>
                                <a onClick={() => handleCategoryClick("Accesorios-de-freno")}>Accesorios de freno</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Ruedas y Neumáticos <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Neumáticos")}>Neumáticos</a>
                                <a onClick={() => handleCategoryClick("Llantas")}>Llantas</a>
                                <a onClick={() => handleCategoryClick("Cámaras-de-aire")}>Cámaras de aire</a>
                                <a onClick={() => handleCategoryClick("Válvulas")}>Válvulas</a>
                                <a onClick={() => handleCategoryClick("Rayos-y-Niples")}>Rayos y Niples</a>
                                <a onClick={() => handleCategoryClick("Accesorios-de-rueda")}>Accesorios de rueda</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Escape <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Silenciadores")}>Silenciadores</a>
                                <a onClick={() => handleCategoryClick("Colectores")}>Colectores</a>
                                <a onClick={() => handleCategoryClick("Tuberías")}>Tuberías</a>
                                <a onClick={() => handleCategoryClick("Escape-varios")}>Escape varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Carrocería <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Carcasas")}>Carcasas</a>
                                <a onClick={() => handleCategoryClick("Guardabarros")}>Guardabarros</a>
                                <a onClick={() => handleCategoryClick("Tanques-de-gasolina")}>Tanques de gasolina</a>
                                <a onClick={() => handleCategoryClick("Cubiertas-laterales")}>Cubiertas laterales</a>
                                <a onClick={() => handleCategoryClick("Baúles")}>Baúles</a>
                                <a onClick={() => handleCategoryClick("Asientos")}>Asientos</a>
                                <a onClick={() => handleCategoryClick("Cascos")}>Cascos</a>
                                <a onClick={() => handleCategoryClick("Accesorios-varios")}>Accesorios varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Iluminación y Electrónica <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Baterías")}>Baterías</a>
                                <a onClick={() => handleCategoryClick("Alarmas")}>Alarmas</a>
                                <a onClick={() => handleCategoryClick("GPS")}>GPS</a>
                                <a onClick={() => handleCategoryClick("Faros")}>Faros</a>
                                <a onClick={() => handleCategoryClick("Luces-traseras")}>Luces traseras</a>
                                <a onClick={() => handleCategoryClick("Intermitentes")}>Intermitentes</a>
                                <a onClick={() => handleCategoryClick("Luces-LED")}>Luces LED</a>
                                <a onClick={() => handleCategoryClick("Iluminacion-varios")}>Iluminacion varios</a>
                                <a onClick={() => handleCategoryClick("Electronica-varios")}>Electronica varios</a>  
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box">Otros <span className='simbolito'> ⌵</span></a></li>
                            <div className="dropdown-content">
                                <a onClick={() => handleCategoryClick("Herramientas")}>Herramientas</a>
                                <a onClick={() => handleCategoryClick("Lubricantes-y-aceites")}>Lubricantes y aceites</a>
                                <a onClick={() => handleCategoryClick("Limpieza")}>Limpieza</a>
                                <a onClick={() => handleCategoryClick("Filtros")}>Filtros</a>
                                <a onClick={() => handleCategoryClick("Kits-de-reparación")}>Kits de reparación</a>
                                <a onClick={() => handleCategoryClick("Bicicletas")}>Bicicletas</a>
                            </div>
                    </div>
                </ul>
            </div>
            <div className='categories'>
                <button 
                  className="menu-toggle" 
                  onClick={handleMenuToggle}>
                  ☰ Categorías
                </button>
                    <ul className={menuOpen ? "active" : ""}>
                    {Object.entries(categories).map(([category, items]) => (
                        <div className="dropdown-container-navbar" key={category}>
                            <li className="category-title">
                            <button
                                className="dropdown-btn"
                                onClick={() => toggleDropdown(category)}
                            >
                                {category} ⌵
                            </button>
                            </li>
                            <div
                            className="dropdown-content-sidebar"
                            style={{
                                display: openDropdown[category] ? "flex" : "none",
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
        </header>
    );
};

export default NavBar;

