import React from "react";
import StoreInfoSideBar from "./StoreInfoSideBar";
import "../CSS Styles/StoreInfo.css";
import laEmpresa from "../uploads/empresa.jpg";

const LaEmpresa = () => {

  return (
    <div className="StoreInfo-main-container">
      <div>
        <StoreInfoSideBar></StoreInfoSideBar>
      </div>
      <div className="store-info-container">
        <h2 className="Store-info-title">La Empresa</h2>
        <div className="info-box">
          <img src={laEmpresa} alt="La empresa" className="empresa-picture"></img>
          <p className="parrafo-la-empresa-1">Fundada en 2018 por el Sr. Andrés Waszaj, nuestra empresa nació como un emprendimiento familiar 
            basado en más de 30 años de experiencia en el sector de motocicletas. Desde el inicio, nos hemos 
            caracterizado por el compromiso, la dedicación y la búsqueda constante de la excelencia, valores 
            que han sido fundamentales para nuestro crecimiento.</p>

            <p className="parrafo-la-empresa-2">Gracias al esfuerzo incansable de Andrés y su familia, logramos expandirnos, estableciendo 
              relaciones comerciales en todo el país y llegando al mercado internacional. Nuestra trayectoria 
              está respaldada por un servicio excepcional y un profundo conocimiento del rubro, lo que nos 
              posiciona como un referente confiable en el mundo de las motocicletas.</p>

            <p className="parrafo-la-empresa-3">Hoy en día, continuamos trabajando con la misma pasión y compromiso que nos impulsaron desde 
              el principio, manteniendo el objetivo de superar las expectativas de nuestros clientes y fortalecer 
              nuestra presencia en el mercado.</p>
        </div>
      </div>
    </div>
  );
};

export default LaEmpresa; 