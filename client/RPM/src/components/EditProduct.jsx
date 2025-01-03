import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../CSS-Styles/EditProduct.css';

const EditProduct = () => {
    const [product, setProduct] = useState({
        code: 0,  
        name: '',
        brand: '',
        description: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isProductLoaded, setIsProductLoaded] = useState(false); // Para verificar si el producto ha sido cargado
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

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setError(null); // Limpia el mensaje de error
        setSuccess(null); // Limpia el mensaje de éxito

    };

    // Manejar cambios en la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file });
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Buscar producto por código
    const handleSearchProductByCode = async () => {
        setError(null);
        setSuccess(null);
        try {
            const response = await Axios.get(`https://rpm-oi7i.onrender.com/product/code/${product.code}`);
            setProduct({
                code: response.data.code,
                name: response.data.name,
                brand: response.data.brand,
                category: response.data.category,
                description: response.data.description,
                image: response.data.image,
            });
            
            const imageUrl = `https://rpm-oi7i.onrender.com/${response.data.image}`;
            setPreviewImage(imageUrl);  // Establecer la URL de la imagen en el estado
    
            // Log después de actualizar el estado
            console.log('Previsualización de la imagen:', imageUrl);
    
            setIsProductLoaded(true);
        } catch (error) {
            console.error(error);
            setError("Producto no encontrado. Verifica el código.");
        }
    };
    
    // Manejar la edición del producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const isConfirmed = window.confirm("¿Estás seguro que deseas editar este producto?");
        if(isConfirmed){
        try {
            const formData = new FormData();
            formData.append('code', product.code); // Añadir código del producto
            formData.append('name', product.name); // Añadir nombre
            formData.append('brand', product.brand); // Añadir nombre
            formData.append('category', product.category); // Añadir categoría
            formData.append('description', product.description); // Añadir descripción
    
            // Si hay una imagen seleccionada, incluirla
            if (product.image) {
                formData.append('image', product.image); // Nombre clave 'image'
            }
    
            const token = localStorage.getItem('accessToken');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };
    
            let response = await Axios.put(`https://rpm-oi7i.onrender.com/product/code/${product.code}/edit`, formData, { headers });

            if (response.status === 401) {
                const refreshResponse = await Axios.post('https://rpm-oi7i.onrender.com/api/auth/refreshToken', { refreshToken });
                const newToken = refreshResponse.data.accessToken;
    
                localStorage.setItem('accessToken', newToken);
                headers['Authorization'] = `Bearer ${newToken}`;
    
                response = await Axios.put(`https://rpm-oi7i.onrender.com/product/code/${product.code}/edit`, formData, { headers });
            }
    
            if (response.status === 200) {
                // Limpiar los campos del formulario
                setProduct({
                    code: 0,
                    name: '',
                    brand: '',
                    category: '',
                    description: '',
                    image: null,
                });
                setPreviewImage(null);  // Limpiar la previsualización de la imagen
                setSuccess("Producto actualizado exitosamente.");
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Limpiar el campo de archivo
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Ocurrió un error inesperado.');
        }}
    };    
    
    
    const handleDelete = async () => {
        // Mostrar mensaje de confirmación
        const isConfirmed = window.confirm("¿Estás seguro que deseas eliminar este producto permanentemente?");
        
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                };
        
                // Intenta eliminar el producto
                let response = await Axios.delete(`https://rpm-oi7i.onrender.com/product/delete/${product.code}`, { headers });
        
                // Si el token expira, realiza un refresh y reintenta
                if (response.status === 401) {
                    const refreshResponse = await Axios.post('https://rpm-oi7i.onrender.com/api/auth/refreshToken', { refreshToken });
                    const newToken = refreshResponse.data.accessToken;
        
                    // Actualiza el token en localStorage y en los headers
                    localStorage.setItem('accessToken', newToken);
                    headers['Authorization'] = `Bearer ${newToken}`;
        
                    // Reintenta la eliminación con el nuevo token
                    response = await Axios.delete(`https://rpm-oi7i.onrender.com/product/delete/${product.code}`, { headers });
                }
        
                // Verifica si la eliminación fue exitosa
                if (response.status === 204) {
                    console.log("Producto eliminado exitosamente:", response);
                    setSuccess("Producto eliminado exitosamente.");
                    // Limpiar los campos del formulario
                    setProduct({
                        code: 0,
                        name: '',
                        brand: '',
                        category: '',
                        description: '',
                        image: null,
                    });
                    setPreviewImage(null);  // Limpiar la previsualización de la imagen
                }
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Ocurrio un error inesperado.');
                }}}
    };
    
    // Manejar cancelación
    const handleCancel = () => {
        navigate('/menu');
    };

    return (
        <div className="container-container">
        <div className="form-container" id='Form-container'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="titulo-secundario">Editar producto por código</h2>

                {/* Buscar producto por código */}
                <div>
                    <label htmlFor="code">SKU:</label> 
                    <input 
                        type="number"
                        id="code"  
                        name="code"  
                        value={product.code}
                        onChange={handleChange}
                        required
                    />
                    <button className='edit-button' type="button" onClick={handleSearchProductByCode}>Buscar producto</button>
                </div>

                {/* Mostrar los campos de edición solo si el producto está cargado */}
                {isProductLoaded && (
                    <>
                        <div>
                            <label htmlFor="name">Nombre del producto:</label>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="brand">Marca:</label>
                            <input 
                                type="text"
                                id="brand"
                                name="brand"
                                value={product.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Categoria:</label>
                            <select id="category" name="category" value={product.category} onChange={handleChange} required>
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
                            />
                        </div>
                        <div>
                            <label htmlFor="image">Imagen (opcional):</label>
                            <input 
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>

                        {previewImage && (
                            <div className="img-preview">
                                <img src={previewImage} alt="Previsualización de la imagen" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                            </div>
                        )}

                        {/* Contenedor para los botones */}
                        <div className="button-container">
                            <button className="button-1" type="submit">Guardar cambios</button>
                            <button className="button-3" type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                                Eliminar producto
                            </button>
                            <button className="button-2" type="button" onClick={handleCancel}>
                                Cancelar
                            </button>
                        </div>
                    </>
                )}

            </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
        </div>
    );
};

export default EditProduct;