import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../CSS Styles/ProductDetails.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null); // Iniciar el estado del producto como null
    const [error, setError] = useState("");
    const { code } = useParams(); 

    useEffect(() => {
        if (code) {
            const getProduct = async () => {
                try {
                    const URL = `http://localhost:8080/product/code/${code}`;
                    const response = await axios.get(URL);
                    setProduct(response.data); 
                } catch (error) {
                    console.log("Error fetching product:", error);
                    setError("Failed to fetch product.");
                }
            };
            getProduct();
        }
    }, [code]);

    return (
        <div className="product-details-container">
            {error && <div className="error-message">{error}</div>}
            {product ? (
                <div>
                    <div className="product-container">
                        <div>
                            <img src={`http://localhost:8080/${product.image}`} alt="Producto" />
                        </div>
                        <div className="Product-information-bar">
                            <h3>{product.name}</h3>
                            <p className="sku-section">SKU: <span className="SKU-content">{product.code}</span></p>
                            <p>Marca: <span>{product.brand}</span></p>
                            <p>Categoría: <span>{product.category}</span></p>
                            <p className="warning">* Precio y Stock sujeto a disponibilidad.</p>
                            <button> <i className="fa fa-whatsapp" aria-hidden="true"></i> Consultar por Whatsapp</button>
                        </div>
                    </div>
                    <div className="description">
                        <p>Descripción: {product.description}</p>
                    </div>
                </div>
            ) : (
                <p className="no-details-message">No hay detalles disponibles del producto.</p>
            )}
        </div>
    );
};

export default ProductDetails;
