const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const path = require('path');
const formRoutes = require('./routes/formRoutes');

require("./config/config.mongoose");

const app = express();
const port = 8080;

// Configurar CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'https://rpm-motos.com'], // Permitir solo solicitudes desde el frontend
    methods: 'GET,POST,PUT,DELETE',
  };
  app.use(cors(corsOptions));
// Agregar el encabezado de Content-Security-Policy
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' http://localhost:8080;");
    next();
  });
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/contact', formRoutes);
app.use('/product', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => console.log(`Conection succesfull at port ${port}`));
