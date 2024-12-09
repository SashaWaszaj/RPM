import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../CSS Styles/ProductList.css";
import Sidebar from "./SideBar";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <div className="main-container">
      <div className="sidebar">
        <Sidebar products={products} />
      </div>
      <div className="product-list-container">
        <h2 className="titulo-subtitulo-product-list">
          Productos en la categoría: {category}
        </h2>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-item">
                <Link to={`/${product.code}`} className="link">
                  {product && product.image && (
                    <div>
                      <img
                        src={`http://localhost:8080/${product.image}`}
                        alt="Producto"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </Link>
                <Link to={`/${product.code}`} className="link">
                  <h3>{product.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p className="titulo-subtitulo-product-list">
              No hay productos disponibles en esta categoría.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;




