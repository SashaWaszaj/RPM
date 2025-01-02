const express = require('express');
const formRouter = express.Router();
const formController = require('../controllers/formController');
const { verifyToken } = require('../middlewears/validateToken');

formRouter.post('/send', formController.sendForm);
formRouter.get('/messages', formController.getMessages);
formRouter.delete('/delete/:id', formController.deleteMessage);

module.exports = formRouter;
