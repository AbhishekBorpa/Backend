import mongoose from "mongoose";
import { DBname } from "../constant.js";
const connectDB = async () => {
  try {
    console.log("Attempting to connect to:", `${process.env.MONGO_URI}/${DBname}`);
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DBname}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit process on DB failure
  }
};

export default connectDB;


