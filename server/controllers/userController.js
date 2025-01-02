const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Token = require('../models/Token');
const { SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/keys');

// Registro de usuario
exports.register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ userName, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

        await Token.create({ userId: user._id, refreshToken });

        res.status(200).json({ accessToken, refreshToken, user: { id: user._id, userName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

// Renovación del token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const tokenDoc = await Token.findOne({ refreshToken });
        if (!tokenDoc) return res.status(403).json({ message: 'Refresh token no válido' });

        jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Refresh token expirado' });

            const newAccessToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, { expiresIn: '24h' });
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al renovar token', error: error.message });
    }
};






