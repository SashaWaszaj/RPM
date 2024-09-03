const mongoose = require('mongoose');
import categorySchema from "./categoryModel";

const productSchema = mongoose.Schema({
    code: {
        type: Number,
        required: [true, 'Please insert the code of the product.']
    },
    name: {
        type: String,
        required: [true, 'Please insert the name of the product.'],
    },
    description: {
        type: String,
        required: [false]
    },
    category: { categorySchema }
      
});

const Product = mongoose.model ("Product", productSchema);

module.exports = Product;