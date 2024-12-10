import React from "react";
import StoreInfoSideBar from "./StoreInfoSideBar";
import "../CSS Styles/StoreInfo.css";

const Contacto = () => {

  return (
    <div className="StoreInfo-main-container">
      <div>
        <StoreInfoSideBar></StoreInfoSideBar>
      </div>
      <div>
        <h2>Contáctanos</h2>
        <div className="info-box-2">
          <div className="info-box-contacto-horario">
              <div className="contacto">
                  <h4><i className="fa fa-phone" aria-hidden="true"></i>CONTACTO</h4>
                  <p>+595 985 172178</p>
              </div>
              <div className="horario">
                  <h4><i class="fa fa-clock-o" aria-hidden="true"></i>HORARIO DE ATENCION</h4>
                  <p>Lunes a Viernes de 07:00 a 17:00Hs.</p>
                  <p>Sábados de 07:00 a 13:00Hs.</p>   
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 