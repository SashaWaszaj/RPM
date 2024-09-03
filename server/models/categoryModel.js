const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please insert the name of the category.'],
    }
      
});

const Category = mongoose.model ("Category", categorySchema);

module.exports = Category;