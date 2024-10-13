import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log({ error });
    throw new Error(error.message || "Connection error");
  }
};
