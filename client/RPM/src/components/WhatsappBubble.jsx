import React from "react";
import "../CSS-Styles/WhatsAppBubble.css";
import whatsapp from "../img/whatsapp.png"

const WhatsAppBubble = ({ phoneNumber, message }) => {
  // Formatea el enlace de WhatsApp
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message || "Hola, quiero más información."
  )}`;

  return (
    <div className="whatsapp-float">
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <img
          src={whatsapp}
          alt="WhatsApp"
        />
      </a>
    </div>
  );
};

export default WhatsAppBubble;
