const express = require('express');
const productRouter = express.Router();
const productControllers = require ('../controllers/productController');
const multer = require('multer');
const upload = require('../config/multer/multer');
const userControllers = require('../controllers/userController');
const validateToken = require('./../middlewears/validateToken');


productRouter.post('/new',validateToken, upload.single('image'), productControllers.createProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/code/:code', productControllers.getProductByCode);
productRouter.put('/code/:code/edit',validateToken, productControllers.updateProductByCode); 
productRouter.delete('/delete/:code',validateToken, productControllers.deleteProduct);
productRouter.post('/register', userControllers.register );
productRouter.post('/login', userControllers.login);

module.exports = productRouter;