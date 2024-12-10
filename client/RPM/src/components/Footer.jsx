import React from 'react';
import '../CSS Styles/Footer.css'; // Archivo CSS para estilos
import logo from '../img/RPM.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className='top-container-info-social'>
                <div className='footer-section-info'>
                    <Link to="/"><img className='logo' src={logo} alt='RPM logo'/></Link>
                    <p>Empresa de Ventas al por mayor y menor de repuestos y accesorios para motos en general</p>
                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> Calle Coronel Bogado casi costanera 6000 Encarnacion, Paraguay</p>
                    <p><i class="fa fa-whatsapp" aria-hidden="true"></i> +595 985 172178</p>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    </div>
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
