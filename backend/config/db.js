require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connection established succesfully");
  } catch (e) {
    console.log(e.message);
    console.error("mongo connection failed");
    process.exit(1);
  }
};
module.exports = connectDB;
