import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from 'axios';
import '../CSS Styles/productForm.css';

const ProductForm = () => {
    const [product, setProduct] = useState({
        code: '',  
        name: '',
        brand: '',
        category: '',
        description: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [success, setSuccess] = useState(null); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Lista de categorías
    const categories = [
        "Pistones", "Cilindros", "Juntas", "Cigüeñal", "Bielas", 
        "Cadenas-de-distribución", "Cajas-de-cambio", "Carburadores", 
        "Accesorios-de-motor", "Embragues", "Cadenas-y-Correas", 
        "Piñones", "Ejes-de-transmisión", "Poleas", "Rodamientos", 
        "Transmision-varios", "Amortiguadores", "Horquillas", 
        "Resortes", "Manillares", "Rodamientos-de-dirección", 
        "Suspension-y-direccion-varios", "Pastillas-de-freno", 
        "Discos-de-freno", "Cilindros-maestros", "Zapatas", 
        "Accesorios-de-freno", "Neumáticos", "Llantas", "Cámaras-de-aire", 
        "Válvulas", "Rayos-y-Niples", "Accesorios de rueda", 
        "Silenciadores", "Colectores", "Tuberías", "Escape varios", 
        "Carcasas", "Guardabarros", "Tanques-de-gasolina", 
        "Cubiertas-laterales", "Baúles", "Asientos", "Cascos", 
        "Accesorios-varios", "Baterías", "Alarmas", "GPS", "Faros", 
        "Luces-traseras", "Intermitentes", "Luces-LED", "Iluminacion-varios", 
        "Electronica-varios", "Herramientas", "Lubricantes y aceites", 
        "Limpieza", "Filtros", "Kits-de-reparación", "Bicicletas"
    ];

    // Ordenar categorías alfabéticamente
    const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, image: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccess(null); 
        try {
            const formData = new FormData();
            formData.append('code', product.code);
            formData.append('name', product.name);
            formData.append('brand', product.brand);
            formData.append('category', product.category);
            formData.append('description', product.description);
            formData.append('image', product.image);
    
            const token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
    
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };
    
            let response = await Axios.post('http://localhost:8080/product/new', formData, { headers });
    
            if (response.status === 401) {
                const refreshResponse = await Axios.post('http://localhost:8080/api/auth/refreshToken', { refreshToken });
                const newToken = refreshResponse.data.accessToken;
    
                localStorage.setItem('accessToken', newToken);
                headers['Authorization'] = `Bearer ${newToken}`;
    
                response = await Axios.post('http://localhost:8080/product/new', formData, { headers });
            }
    
            if (response.status === 201) {
                console.log("Producto creado exitosamente:", response);
                setProduct({
                    code: '',
                    name: '',
                    brand: '',
                    category: '',
                    description: '',
                    image: null,
                });
                setPreviewImage(null);
                setSuccess("Producto creado exitosamente.");
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Limpiar el campo de archivo
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Ocurrio un error inesperado.');
            }
        }
    };
    

    const handleCancel = () => {
        navigate("/menu");
    };

    const handleFocus = () => {
        setSuccess(null); // Oculta el mensaje de éxito cuando el usuario hace foco en cualquier input
    };

    return (
        <div className="form-container" id='Form-container'>
            <form onSubmit={handleSubmit}>
                <h2 className="titulo-secundario">Agregar nuevo producto</h2>
                <div>
                    <label htmlFor="code">SKU:</label>
                    <input 
                        type="number"
                        id="code"  
                        name="code"  
                        value={product.code}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Nombre del producto:</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brand">Marca (opcional):</label>
                    <input 
                        type="text"
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </div>
                <div className="category">
                    <label htmlFor="category">Categoría:</label>
                    <select id="category" name="category" value={product.category} onChange={handleChange} onFocus={handleFocus} required>
                        <option value="">Selecciona una categoría</option>
                        {sortedCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Descripción (opcional):</label>
                    <input 
                        type="text"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </div>
                <div>
                    <label htmlFor="image">Imagen (opcional):</label>
                    <input 
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        onFocus={handleFocus}
                        ref={fileInputRef}
                    />
                </div>
                {previewImage && (
                    <div>
                        <img src={previewImage} alt="Previsualización" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    </div>
                )}
                <button className="button-1" role="button" type="submit">Agregar producto</button>
                <button className="button-2" role="button" type="button" onClick={handleCancel}>Cancelar</button>
                
            </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
    );
};

export default ProductForm;

