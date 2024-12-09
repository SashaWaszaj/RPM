const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = user; // Agregar la información del usuario al request
        next();
    });
};
