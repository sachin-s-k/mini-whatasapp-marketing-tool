import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
