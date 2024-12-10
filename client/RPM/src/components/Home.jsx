import React, { useState, useEffect } from 'react';
import '../CSS Styles/Home.css'; 
import banner1 from '../img/banner 1.png';
import banner2 from '../img/banner 2.png';
import banner3 from '../img/banner 3.png';
import BrandsCarrousel from './BrandsCarrousel';

const images = [ banner1, banner2, banner3 ];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Cambia de imagen cada 3 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    return (
        <div>
            <div className="carousel-container">
                <img
                    src={images[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    className="carousel-image"
                />
            </div>
            <div>
                <BrandsCarrousel></BrandsCarrousel>
            </div>
        </div>
    );
};

export default Home;
