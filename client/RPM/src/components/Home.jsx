import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../CSS-Styles/Home.css"; 
import banner1 from "../img/banner-1.png";
import banner2 from "../img/Banner-2.png";
import banner3 from "../img/Banner-3.png";
import BrandsCarrousel from "./BrandsCarrousel";
import NovedadesCarrousel from "./NovedadesCarrousel";

const images = [banner1, banner2, banner3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/product/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
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
      <NovedadesCarrousel products={products} />
      <BrandsCarrousel />
    </div>
  );
};

export default Home;
