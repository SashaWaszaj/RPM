import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductList = () => {
  const { category } = useParams(); // Captura la categoría desde la URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/product'); // Ajusta el endpoint según tu API
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    
    fetchProducts();
  }, []);

  // Filtrar productos según la categoría capturada desde la URL
  useEffect(() => {
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <div className="product-list-container">
      <h2 className='titulo-subtitulo-product-list'>Productos en la categoría: {category}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <Link to={`/${product.code}`} className='link'>  <img src={`http://localhost:8080/uploads/${product.image}`} alt={product.name} /></Link>
              <Link to={`/${product.code}`} className='link'><h3>{product.name}</h3></Link>
            </div>
          ))
        ) : (
          <p className='titulo-subtitulo-product-list'>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;



