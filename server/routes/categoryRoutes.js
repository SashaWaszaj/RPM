const express = require('express');
const categoryRouter = express.Router();
const categoryControllers = require ('../controllers/categoryController');

categoryRouter.post('/new', categoryControllers.createCategory);
categoryRouter.get('/', categoryControllers.getAllCategories);
categoryRouter.get('/:id', categoryControllers.getAllCategoryById);
categoryRouter.put('/:id/edit', categoryControllers.updateCategory); 
categoryRouter.delete('/delete/:id', categoryControllers.deleteCategory);

module.exports = categoryRouter;