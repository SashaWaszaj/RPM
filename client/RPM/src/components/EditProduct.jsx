import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
const token = localStorage.getItem('userToken');
const headers = {
    Authorization: `Bearer ${token}` // Incluye el token en los encabezados
};

const EditProduct = () => {
    const [product, setProduct] = useState({
        code: '',  
        name: '',
        category: '',
        description: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const [isProductLoaded, setIsProductLoaded] = useState(false); // Para verificar si el producto ha sido cargado
    const navigate = useNavigate();
    
    

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Manejar cambios en la imagen
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

    // Buscar producto por código
    const handleSearchProductByCode = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/product/code/${product.code}`);
            setProduct({
                code: response.data.code,
                name: response.data.name,
                category: response.data.category,
                description: response.data.description,
                image: response.data.image,
            });
            setPreviewImage(`http://localhost:8080/uploads/${response.data.image}`);
            setIsProductLoaded(true); // Producto encontrado y cargado
        } catch (error) {
            console.error(error);
            setError("Producto no encontrado. Verifica el código.");
        }
    };

    // Manejar la edición del producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('code', product.code);
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('description', product.description);
            if (product.image) {
                formData.append('image', product.image);
            }
           
            // Enviar una solicitud PUT para actualizar el producto
            const response = await Axios.put(`http://localhost:8080/product/code/${product.code}/edit`, formData, {
                headers: {
                    ...headers, 
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            navigate(`/product/${product.category}`); // Redirigir después de la edición
        } catch (error) {
            console.error(error);
            setError("Error al editar el producto. Por favor, intenta nuevamente.");
        }
    };

    // Manejar la eliminación del producto
    const handleDelete = async () => {
        try {
            const response = await Axios.delete(`http://localhost:8080/product/delete/${product.code}`, { headers });
            console.log(response);
            navigate('/menu'); // Redirigir después de eliminar
        } catch (error) {
            console.error(error);
            setError("Error al eliminar el producto. Por favor, intenta nuevamente.");
        }
    };

    // Manejar cancelación
    const handleCancel = () => {
        navigate('/menu');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="titulo-secundario">Editar producto por código</h2>

                {/* Buscar producto por código */}
                <div>
                    <label htmlFor="code">Código del producto:</label> 
                    <input 
                        type="number"
                        id="code"  
                        name="code"  
                        value={product.code}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" onClick={handleSearchProductByCode}>Buscar producto</button>
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
                    <label htmlFor="category">Categoria:</label>
                    <select id="category" name="category" value={product.category} onChange={handleChange} required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Pistones">Pistones</option>
                        <option value="Cilindros">Cilindros</option>
                        <option value="Juntas">Juntas</option>
                        <option value="Cigüeñal">Cigüeñal</option>
                        <option value="Bielas">Bielas</option>
                        <option value="Cadenas-de-distribución">Cadenas de distribución</option>
                        <option value="Cajas-de-cambio">Cajas de cambio</option>
                        <option value="Carburadores">Carburadores</option>
                        <option value="Accesorios-de-motor">Accesorios de motor</option>
                        <option value="Embragues">Embragues</option>
                        <option value="Cadenas-y-Correas">Cadenas y Correas</option>
                        <option value="Piñones">Piñones</option>
                        <option value="Ejes-de-transmisión">Ejes de transmisión</option>
                        <option value="Poleas">Poleas</option>
                        <option value="Rodamientos">Rodamientos</option>
                        <option value="Transmision-varios">Transmision varios</option>
                        <option value="Amortiguadores">Amortiguadores</option>
                        <option value="Horquillas">Horquillas</option>
                        <option value="Resortes">Resortes</option>
                        <option value="Manillares">Manillares</option>
                        <option value="Rodamientos-de-dirección">Rodamientos de dirección</option>
                        <option value="Suspension-y-direccion-varios">Suspension y direccion varios</option>
                        <option value="Pastillas-de-freno">Pastillas de freno</option>
                        <option value="Discos-de-freno">Discos de freno</option>
                        <option value="Cilindros-maestros">Cilindros maestros</option>
                        <option value="Zapatas">Zapatas</option>
                        <option value="Accesorios-de-freno">Accesorios de freno</option>
                        <option value="Neumáticos">Neumáticos</option>
                        <option value="Llantas">Llantas</option>
                        <option value="Cámaras-de-aire">Cámaras de aire</option>
                        <option value="Válvulas">Válvulas</option>
                        <option value="Rayos-y-Niples">Rayos y Niples</option>
                        <option value="Accesorios de rueda">Accesorios de rueda</option>
                        <option value="Silenciadores">Silenciadores</option>
                        <option value="Colectores">Colectores</option>
                        <option value="Tuberías">Tuberías</option>
                        <option value="Escape varios">Escape varios</option>
                        <option value="Carcasas">Carcasas</option>
                        <option value="Guardabarros">Guardabarros</option>
                        <option value="Tanques-de-gasolina">Tanques de gasolina</option>
                        <option value="Cubiertas-laterales">Cubiertas laterales</option>
                        <option value="Baúles">Baúles</option>
                        <option value="Asientos">Asientos</option>
                        <option value="Cascos">Cascos</option>
                        <option value="Accesorios-varios">Accesorios varios</option>
                        <option value="Baterías">Baterías</option>
                        <option value="Alarmas">Alarmas</option>
                        <option value="GPS">GPS</option>
                        <option value="Faros">Faros</option>
                        <option value="Luces-traseras">Luces traseras</option>
                        <option value="Intermitentes">Intermitentes</option>
                        <option value="Luces-LED">Luces LED</option>
                        <option value="Iluminacion-varios">Iluminacion varios</option>
                        <option value="Electronica-varios">Electronica varios</option>
                        <option value="Herramientas">Herramientas</option>
                        <option value="Lubricantes y aceites">Lubricantes y aceites</option>
                        <option value="Limpieza">Limpieza</option>
                        <option value="Filtros">Filtros</option>
                        <option value="Kits-de-reparación">Kits de reparación</option>
                        <option value="Bicicletas">Bicicletas</option>
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
                            />
                        </div>

                        {/* Mostrar la previsualización de la imagen */}
                        {previewImage && (
                            <div>
                                <img src={previewImage} alt="Previsualización de la imagen" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                            </div>
                        )}

                        <button className="button-1" type="submit">Guardar cambios</button>
                        <button className="button-3" type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                            Eliminar producto
                        </button>
                        <button className="button-2" type="button" onClick={handleCancel}>Cancelar</button>
                        
                    </>
                )}

                <div>{error}</div>
            </form>
        </div>
    );
};

export default EditProduct;