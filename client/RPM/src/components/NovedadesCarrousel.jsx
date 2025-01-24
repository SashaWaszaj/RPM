import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../CSS-Styles/ProductList.css"; // Reutiliza los estilos de ProductList
import "../CSS-Styles/NovedadesCarrousel.css";

const NovedadesCarrousel = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("https://rpm-jgtt.onrender.com/product/");

        // Ordenar productos por fecha de creación descendente y tomar los últimos 10
        const sortedProducts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="novedades-carrousel">
      <h2 className="titulo-subtitulo-product-list-carrousel">Novedades</h2>
      <div className="carrousel-list">
        {latestProducts.map((product) => (
          <div key={product._id} className="product-item">
            <Link to={`/${product.code}`} className="link">
              {product.image && (
                <div>
                  <img
                    src={`https://rpm-jgtt.onrender.com/${product.image}`}
                    alt={product.name}
                    className="product-item-img"
                  />
                </div>
              )}
            </Link>
            <Link to={`/${product.code}`} className="link">
              <h4><span style={{fontWeight: "bold", color: "black"}}>SKU:</span> {product.code}</h4>
              <h3>{product.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovedadesCarrousel;

