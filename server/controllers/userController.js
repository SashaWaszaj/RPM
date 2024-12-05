const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const clave = process.env.JWT_SECRET || 'clave_secreta_por_defecto';

module.exports.register = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
      // Crear el usuario sin necesidad de hashear la contraseña aquí
      const newUser = await User.create({
        userName,
        email,
        password // Aquí solo pasamos la contraseña tal cual, el hasheo lo hace el modelo
      });
  
      // Información para el token
      const infoEnToken = {
        userName: newUser.userName,
        email: newUser.email
      };
  
      // Generar el token JWT
      jwt.sign(infoEnToken, clave, { expiresIn: '24h' }, (error, token) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error al generar el token' });
        }
        return res.status(201).json({
          mensaje: "Usuario registrado exitosamente.",
          token,
          user: {
            userName: newUser.userName,
            email: newUser.email,
          }
        });
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      return res.status(500).json({ mensaje: "Error al registrar el usuario.", error: error.message });
    }
  };  


module.exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        console.log("Usuario recibido en el login:", userName);
        console.log("Contraseña recibida:", password);

        // Buscar el usuario por su userName
        const foundUser = await User.findOne({ userName });
        if (!foundUser) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        console.log("Usuario encontrado en la base de datos:", foundUser);

        // Comparar la contraseña ingresada con la hasheada
        const isMatch = await bcrypt.compare(password, foundUser.password);
        console.log("¿Coinciden las contraseñas?:", isMatch);

        if (!isMatch) {
            console.error("Contraseña incorrecta");
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Generar el token si las contraseñas coinciden
        const infoEnToken = {
            userName: foundUser.userName,
            email: foundUser.email
        };

        jwt.sign(infoEnToken, clave, { expiresIn: '24h' }, (error, token) => {
            if (error) {
                console.error("Error al generar el token:", error);
                return res.status(500).json({ mensaje: 'Error interno al generar el token' });
            }
            console.log("Token generado correctamente:", token);
            return res.status(200).json({ token, user: foundUser });
        });
        console.log("Usuario encontrado en la base de datos:", foundUser);
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};





