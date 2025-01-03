import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../CSS-Styles/ProductDetails.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null); // Iniciar el estado del producto como null
    const [error, setError] = useState("");
    const { code } = useParams(); 

    useEffect(() => {
        if (code) {
            const getProduct = async () => {
                try {
                    const URL = `https://rpm-oi7i.onrender.com/product/code/${code}`;
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
                            <img src={`https://rpm-oi7i.onrender.com/${product.image}`} alt="Producto" />
                        </div>
                        <div className="Product-information-bar">
                            <h3>{product.name}</h3>
                            <p className="sku-section">SKU: <span className="SKU-content">{product.code}</span></p>
                            <p>Marca: <span style={{ fontWeight:"bold"}}>{product.brand}</span></p>
                            <p>Categoría: <span style={{ fontWeight:"bold"}} >{product.category}</span></p>
                            <p className="warning">* Precio y Stock sujeto a disponibilidad.</p>
                            {product && (
                             
                                    <a 
                                        href={`https://api.whatsapp.com/send?phone=595985172178&text=${encodeURIComponent(
                                                `Hola, quiero más información sobre ${product.name}.`
                                        )}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i> Consultar por Whatsapp
                                    </a>
                               
                            )}
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
