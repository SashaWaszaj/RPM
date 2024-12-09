const Product = require('../models/productModel');
const upload = require('../config/multer/multer');

module.exports.createProduct = async (req, res) => {
    try {
        // Verificar si se ha subido una imagen
        const image = req.file ? req.file.path : null;

        // Crear el nuevo producto, incluyendo la imagen si existe
        const newProduct = await Product.create({
            ...req.body,
            image: image // Guardamos la ruta de la imagen en el producto
        });

        res.status(201).json(newProduct);
    } catch (error) {
        if (error.code === 11000) { // Código de error de duplicidad en MongoDB
            return res.status(400).json({ message: 'El código del producto ya existe. Debe ser único.' });
        }
        res.status(400).json({ message: error.message });
    }
};



module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ code: req.params.code });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(204).json({ message: "Product successfully deleted." });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getProductByCode = (req, res) => {
    // Buscar el producto por el código proporcionado en req.params.code
    Product.findOne({ code: req.params.code })
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json(error.message);
        });
};

module.exports.updateProductByCode = async (req, res) => {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { name, category, description } = req.body;
        let updateData = { name, category, description };

        // Si hay un archivo, lo añadimos a los datos de actualización
        if (req.file) {
            updateData.image = req.file.path;  // Guardamos la ruta de la imagen
        }

        // Actualizamos el producto en la base de datos usando el código
        const productUpdate = await Product.findOneAndUpdate(
            { code: req.params.code },  // Buscamos el producto por código
            updateData,                 // Los datos que se actualizarán
            { new: true, runValidators: true }  // Asegura que se validen las restricciones
        );

        // Si no se encuentra el producto, devolvemos un error
        if (!productUpdate) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Si se actualiza correctamente, devolvemos el producto actualizado
        return res.status(200).json({ message: 'Producto actualizado exitosamente', product: productUpdate });
    } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
        return res.status(400).json({ message: error.message });
    }
};

module.exports.searchProducts = async (req, res) => {
    const query = req.query.query;
    // Verificamos que se haya proporcionado un término de búsqueda
    if (!query) {
        return res.status(400).json({ message: 'Se requiere un término de búsqueda' });
    }

    try {
        // Buscar productos cuyo nombre contenga el término de búsqueda (ignorando mayúsculas/minúsculas)
        const filteredProducts = await Product.find({
            name: { $regex: query, $options: 'i' } // $regex para búsqueda parcial, $options: 'i' para case insensitive
        });

        // Devolvemos los productos filtrados
        return res.status(200).json(filteredProducts);
    } catch (error) {
        console.error('Error al buscar productos:', error.message);
        return res.status(500).json({ message: error.message });
    }
};








  