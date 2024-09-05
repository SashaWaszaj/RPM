const Product = require('../models/productModel');

module.exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
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
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(204).json({ message: "Product successfully deleted." });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllProductsById = (req, res) => {
    Product.findById(req.params.id)
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

module.exports.updateProduct = async (req, res) => {
    try {
        const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(productUpdate);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
};