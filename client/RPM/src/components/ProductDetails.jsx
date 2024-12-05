import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            
            {/* Mostrar los detalles del producto solo si se ha cargado */}
            {product ? (
                <div>
                    <img src={`http://localhost:8080/uploads/${product.image}`} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Código: {product.code}</p>
                    <p>Categoría: {product.category}</p>
                    <p>Descripción: {product.description}</p>
                </div>
            ) : (
                <p>No hay detalles disponibles del producto.</p>
            )}
        </div>
    );
};

export default ProductDetails;
