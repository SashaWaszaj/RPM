import React from "react";
import StoreInfoSideBar from "./StoreInfoSideBar";
import "../CSS Styles/StoreInfo.css";
import Map from "./Maps";

const Ubicacion = () => {
  
  return (
    <div className="StoreInfo-main-container">
      <div>
        <StoreInfoSideBar></StoreInfoSideBar>
      </div>
      <div>
        <h2>Venga A Visitarnos</h2>
        <div className="info-box-3">
          <div className="info-box-ubicacion">
              <div className="ubicacion">
                  <h4><i className="fa fa-map-marker" aria-hidden="true"></i>CASA CENTRAL</h4>
                  <p>Calle Coronel Bogado Casi Costanera 6000 Encarnacion, Paraguay</p>
              </div>
              <div>
                <Map/>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion; 