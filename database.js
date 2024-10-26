const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    // mongoose.connect(process.env.MONGO_URL).then(() =>{
    //     console.log("connected to MONGODB successfully")
    // }).catch(() =>{
    //     console.lo
    // })
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to MONGODB successfully");
  } catch (err) {
    console.log("Error  in connecting in :" + err);
  }
};

module.exports = connectDB;
