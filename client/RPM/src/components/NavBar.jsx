import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const NavBar = () => {

    return (
        <header className='header'>
            <div className='bar-principal'>
                <div>
                    <h1 className='RPM'>RPM</h1>
                    <h3 className='moto-rep'>Moto Repuestos</h3>
                </div>
                <div className="search-container">
                    <form action="/action_page.php">
                    <input className="search-input" type="text" placeholder="Buscar productos..." name="search"></input>
                    <button className="search-button" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            <div className='categories'>
                <ul>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#nosotros"><i className="fa fa-home"></i>  Nosotros ⌵</a></li>
                            <div className="dropdown-content">
                                <a >La empresa</a>
                                <a >Contacto</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#motor">Motor ⌵ </a></li>
                            <div className="dropdown-content">
                                <a >Pistones</a>
                                <a >Cilindros</a>
                                <a >Juntas</a>
                                <a >Cigüeñal</a>
                                <a >Bielas</a>
                                <a >Cadenas de distribución</a>
                                <a >Culatas</a>
                                <a >Carburadores</a>
                                <a >Motor varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#transmision">Transmisión ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Cajas de cambio</a>
                                <a >Embragues</a>
                                <a >Cadenas y Correas</a>
                                <a >Piñones</a>
                                <a >Ejes de transmisión</a>
                                <a >Poleas</a>
                                <a >Rodamientos</a>
                                <a >Transmision varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#suspension-y-direccion">Suspensión y Direccion ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Amortiguadores</a>
                                <a >Horquillas</a>
                                <a >Resortes</a>
                                <a >Kit de rebote</a>
                                <a >Tijas</a>
                                <a >Manillares</a>
                                <a >Rodamientos de dirección</a>
                                <a >Suspension y direccion varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#frenos">Frenos ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Pastillas de freno</a>
                                <a >Discos de freno</a>
                                <a >Pinzas</a>
                                <a >Cilindros maestros</a>
                                <a >Líneas de freno</a>
                                <a >Pinzas</a>
                                <a >Zapatas</a>
                                <a >Accesorios de freno</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#ruedas-y-neumaticos">Ruedas y Neumáticos ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Neumáticos</a>
                                <a >Llantas</a>
                                <a >Cámaras de aire</a>
                                <a >Válvulas</a>
                                <a >Rayos y Niples</a>
                                <a >Otros accesorios de rueda</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#Escape">Escape ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Silenciadores</a>
                                <a >Colectores</a>
                                <a >Tuberías</a>
                                <a >Escape varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#accesorios-y-carrocería">Accesorios y Carrocería ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Carcasas</a>
                                <a >Guardabarros</a>
                                <a >Tanques de gasolina</a>
                                <a >Cubiertas laterales</a>
                                <a >Baúles</a>
                                <a >Asientos</a>
                                <a >Cascos</a>
                                <a >Accesorios varios</a>
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#iluminacion">Iluminación y electrónica ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Baterías</a>
                                <a >Alarmas</a>
                                <a >GPS</a>
                                <a >Faros</a>
                                <a >Luces traseras</a>
                                <a >Intermitentes</a>
                                <a >Luces LED</a>
                                <a >Iluminacion varios</a>
                                <a >Electronica varios</a>  
                            </div>
                    </div>
                    <div className='dropdown'>
                        <li><a className="category-box" href="#herramientas-y-mantenimiento">Herramientas y Mantenimiento ⌵</a></li>
                            <div className="dropdown-content">
                                <a >Herramientas manuales</a>
                                <a >Lubricantes y aceites</a>
                                <a >Limpieza</a>
                                <a >Filtros</a>
                                <a >Kits de reparación</a>
                                <a>Herramientas varias </a>
                                <a>Mantenimiento varios </a>
                            </div>
                    </div>
                </ul>
            </div>
        </header>
    )
}

export default NavBar;