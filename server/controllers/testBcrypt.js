const bcrypt = require('bcrypt');

// Contraseña que quieres verificar (la misma que ingresaste durante el login)
const inputPassword = 'password123'; // Reemplaza con la contraseña ingresada en Postman

// Hash almacenado en tu base de datos (copia el hash exacto desde MongoDB)
const storedHash = '$2b$10$5dRWQuRVKr2BvjnTQozlNuNaxwMC3CjgsuiyE2e9sdic8vpV0OMye'; // Reemplaza con el hash de la base de datos

async function verifyPassword() {
    try {
        const isMatch = await bcrypt.compare(inputPassword, storedHash);
        if (isMatch) {
            console.log('✅ La contraseña ingresada coincide con el hash almacenado.');
        } else {
            console.log('❌ La contraseña ingresada NO coincide con el hash almacenado.');
        }
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
    }
}

verifyPassword();
