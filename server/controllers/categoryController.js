const Category = require('../models/categoryModel');

module.exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(204).json({ message: "Category successfully deleted." });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllCategoryById = (req, res) => {
    Category.findById(req.params.id)
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json(error.message);
        });
};

module.exports.updateCategory = async (req, res) => {
    try {
        const categoryUpdate = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoryUpdate) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(categoryUpdate);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
    }
};