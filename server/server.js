const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const path = require('path');

require("./config/config.mongoose");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/product', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => console.log(`Conection succesfull at port ${port}`));