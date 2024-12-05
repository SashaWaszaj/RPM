const Product = require('../models/productModel');

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
        const productUpdate = await Product.findOneAndUpdate(
            { code: req.params.code },  
            req.body,                   
            { new: true, runValidators: true } // Asegurar que se validen las restricciones únicas
        );

        if (!productUpdate) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(productUpdate);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El código del producto ya existe. Debe ser único.' });
        }
        return res.status(400).json({ message: error.message });
    }
};



  