import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query'); // Obtén el término de búsqueda

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Axios.get(`http://localhost:8080/product/search?query=${query}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    return (
        <div>
            <h2>Resultados de búsqueda para "{query}"</h2>
                    <div className="product-list">
                        {products.length > 0 ? (
                            products.map((product) => (
                            <div key={product._id} className="product-item">
                                <Link to={`/${product.code}`} className='link'>  
                                    {product && product.image && (
                                <div>
                                    <img src={`http://localhost:8080/${product.image}`} alt="Producto" style={{ maxWidth: '200px', maxHeight: '200px' }}/>
                                </div>
                                )} </Link>
                                <Link to={`/${product.code}`} className='link'><h3>{product.name}</h3></Link>
                            </div>
                            ))
                            ) : (
                            <p className='titulo-subtitulo-product-list'>No hay resultados para "{query}"</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
