import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../CSS Styles/ProductList.css";
import Sidebar from "./SideBar";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 36; // Número de productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/product/");

        // Ordenar productos por fecha de creación en orden descendente
      const sortedProducts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

        setProducts(sortedProducts);
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

  // Calcular los productos visibles según la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <Sidebar products={products} />
      </div>
      <div className="product-list-container">
        <h2 className="titulo-subtitulo-product-list">{category}</h2>
        
        {/* Mostrar rango de resultados y total */}
        <div className="results-summary">
          {filteredProducts.length > 0 && (
            <p>
              Mostrando {indexOfFirstProduct + 1}–
              {Math.min(indexOfLastProduct, filteredProducts.length)} de{" "}
              {filteredProducts.length} resultados
            </p>
          )}
        </div>
        
        <div className="product-list">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product._id} className="product-item">
                <Link to={`/${product.code}`} className="link">
                  {product && product.image && (
                    <div>
                      <img
                        src={`http://localhost:8080/${product.image}`}
                        alt={product.name}
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
        {/* Navegación entre páginas */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;






