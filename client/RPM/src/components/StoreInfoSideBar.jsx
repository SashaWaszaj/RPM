import React from "react";
import "../CSS Styles/SideBar.css";
import { Link } from "react-router-dom";

const StoreInfoSideBar = () => {

  return (
    <div className="sidenav">
      <ul className="Category-list-container">
          <div className="dropdown-container">
            <li className="category-title">
              <Link to="/la-empresa"><button className="dropdown-btn">
              La empresa
              </button>
              </Link>
            </li>
            <li className="category-title">
            <Link to="/contacto"><button className="dropdown-btn">
              Contacto
              </button></Link>
            </li>
            <li className="category-title">
            <Link to="/ubicacion"><button className="dropdown-btn">
              Ubicacion
              </button></Link>
            </li>
            </div>
      </ul>
    </div>
  );
};

export default StoreInfoSideBar; 