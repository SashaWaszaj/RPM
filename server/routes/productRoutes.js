const productControllers = require ('../controllers/productController');
const upload = require('../config/multer/multer');
const express = require('express');
const { verifyToken } = require('../middlewears/validateToken');
const productRouter = express.Router();

productRouter.post('/new',verifyToken, upload.single('image'), productControllers.createProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/code/:code', productControllers.getProductByCode);
productRouter.put('/code/:code/edit',verifyToken,upload.single('image'), productControllers.updateProductByCode); 
productRouter.delete('/delete/:code',verifyToken, productControllers.deleteProduct);
productRouter.get('/search', productControllers.searchProducts);

module.exports = productRouter;