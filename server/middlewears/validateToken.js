const jwt = require('jsonwebtoken');
const clave = process.env.JWT_SECRET || 'clave_secreta_por_defecto';

const validateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extraer el token

    if (!token) {
        return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
    }

    jwt.verify(token, clave, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = user;
        next(); // Continúa con la solicitud si el token es válido
    });
};

module.exports = validateToken;