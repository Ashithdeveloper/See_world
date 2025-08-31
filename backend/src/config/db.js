import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false; // Track the connection status

export const connectDB = async () => {
  if (isConnected) {
    return; // If already connected, skip
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
