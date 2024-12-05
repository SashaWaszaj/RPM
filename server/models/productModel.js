const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    code: {
        type: Number,
        required: [true, 'Please insert the code of the product.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please insert the name of the product.'],
    },
    description: {
        type: String,
        required: [false]
    },
    image: {
        type: String,
        required: [false],
    },
    category: {
        type: String,
        required: [true, 'Please select a category.']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
