import React from 'react';
import '../CSS Styles/Footer.css'; // Archivo CSS para estilos

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="footer-section-copyright">
                    <p>Copyright &copy; {new Date().getFullYear()} RPM MOTOS.Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
