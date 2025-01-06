import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';
import '../CSS-Styles/SearchResults.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]); // Todos los productos
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query'); // Obtén el término de búsqueda

    const productsPerPage = 36; // Productos por página

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Axios.get(`https://rpm-oi7i.onrender.com/product/search?query=${query}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    // Calcular índices para productos visibles
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Manejar cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="Search-results-main-container">
            <Sidebar products={products} />

            <div className="search-results-container">
                <h2>Resultados de búsqueda para "{query}"</h2>

                {/* Mostrar rango de resultados y total */}
                <div className="results-summary">
                    {products.length > 0 && (
                        <p>
                            Mostrando {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, products.length)} de {products.length} resultados
                        </p>
                    )}
                </div>

                <div className="product-list">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product._id} className="product-item">
                                <Link to={`/${product.code}`} className="link">
                                    {product.image && (
                                        <img
                                            src={`https://rpm-oi7i.onrender.com/${product.image}`}
                                            alt={product.name}
                                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                                        />
                                    )}
                                </Link>
                                <Link to={`/${product.code}`} className="link">
                                    <h4><span style={{fontWeight: "bold", color: "black"}}>SKU:</span> {product.code}</h4>
                                    <h3>{product.name}</h3>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="titulo-subtitulo-product-list">No hay resultados para "{query}"</p>
                    )}
                </div>

                {/* Navegación de paginación */}
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`page-button ${
                                    currentPage === index + 1 ? 'active' : ''
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;


