const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

require("./config/config.mongoose");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

app.listen(port, () => console.log(`Conection succesfull at port ${port}`));