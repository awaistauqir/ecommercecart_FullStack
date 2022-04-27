require("dotenv").config();
const productsData = require("./data/products");
const connectDB = require("./config/db");
const ProductModel = require("./models/Product");
const Product = require("./models/Product");
connectDB();
const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    console.log("data imported successfully");
    process.exit(1);
  } catch (e) {
    console.error(error.message);
    process.exit(1);
  }
};
importData();
