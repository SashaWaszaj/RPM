const express = require('express');
const productRouter = express.Router();
const productControllers = require ('../controllers/productController');

productRouter.post('/new', productControllers.createProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/:id', productControllers.getAllProductsById);
productRouter.put('/:id/edit', productControllers.updateProduct); 
productRouter.delete('/delete/:id', productControllers.deleteProduct);

module.exports = productRouter;