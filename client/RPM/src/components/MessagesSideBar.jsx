import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../CSS-Styles/MessagesSideBar.css"; // Si necesitas estilos personalizados

const MessagesSideBar = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores

  // Obtener los mensajes al cargar el componente
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Axios.get("https://rpm-jgtt.onrender.com/contact/messages");
        const sortedMessages = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        setError("Error al cargar los mensajes.");
      }
    };

    fetchMessages();
  }, []);

  // Función para eliminar un mensaje
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro que deseas eliminar este mensaje permanentemente?"
    );

    if (isConfirmed) {
      try {
        const response = await Axios.delete(`https://rpm-jgtt.onrender.com/contact/delete/${id}`);
        if (response.status === 204) {
          // Actualizar la lista de mensajes después de eliminar
          setMessages((prevMessages) => prevMessages.filter((message) => message._id !== id));
        }
      } catch (error) {
        console.error("Error al eliminar el mensaje:", error);
        setError("No se pudo eliminar el mensaje. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="messages-sidebar">
      <h3>Mensajes Recibidos</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="messages-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message._id} className="message-item">
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <h4>{message.name}</h4>
                <button onClick={() => handleDelete(message._id)}>
                  <i className="fa fa-trash" aria-hidden="true" style={{color:"darkred"}}></i>
                </button>
              </div>
              <p>
                <strong>Correo:</strong> {message.email}
              </p>
              <p>
                <strong>Mensaje:</strong> {message.message}
              </p>
              <p className="message-timestamp">
                <small>{new Date(message.createdAt).toLocaleString()}</small>
              </p>
            </li>
          ))
        ) : (
          <p>No hay mensajes disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default MessagesSideBar;

