import React, { useState } from "react";
import StoreInfoSideBar from "./StoreInfoSideBar";
import "../CSS-Styles/StoreInfo.css";

const Contacto = () => {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false); // Para confirmar el envío

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar el formulario");
      }
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      setSubmitted(true); // Mostrar mensaje de éxito
      setError(""); // Limpiar cualquier error previo
    } catch (error) {
      setError(error.message); // Mostrar el mensaje de error
    }
  };
  
  

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
              <h4>
                <i className="fa fa-phone" aria-hidden="true"></i>CONTACTO
              </h4>
              <p>+595 985 172178</p>
            </div>
            <div className="horario">
              <h4>
                <i className="fa fa-clock-o" aria-hidden="true"></i>HORARIO DE
                ATENCIÓN
              </h4>
              <p>Lunes a Viernes de 07:00 a 17:00Hs.</p>
              <p>Sábados de 07:00 a 13:00Hs.</p>
            
          </div>
        </div>
        <div className="form-container">
          <h3 className="mensaje-form-title">Déjanos un mensaje</h3>
          {submitted ? (
            <p>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>
          ) : (
            <form onSubmit={handleSubmit}>
               {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Enviar</button>
            </form>
          )}
        </div></div>
      </div>
    </div>
  );
};

export default Contacto;
 