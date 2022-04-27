require("dotenv").config();
const express = require("express");
const connectionDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

connectionDB();

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  `Server running on port ${PORT}`;
});
