const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    code: {
        type: Number,
        required: [true, 'Please insert the code of the product.'],
        unique: true
    },
    brand: {
        type: String,
        required: [false]
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
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
