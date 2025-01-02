import React from 'react';
import '../CSS Styles/Maps.css';

const Map = () => {
  return (
    <div className='maps-container'>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1490.4721049903624!2d-55.85687922477884!3d-27.314438416239046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945795d463792cbd%3A0x776aeb79307d29d5!2sRPM%20Moto%20Repuestos!5e0!3m2!1ses-419!2spy!4v1733838083039!5m2!1ses-419!2spy" 
        width="600" 
        height="450" 
        className='map'
        allowfullscreen="" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  );
};

export default Map;

