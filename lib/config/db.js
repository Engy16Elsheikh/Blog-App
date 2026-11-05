import mongoose from "mongoose";

export const ConnectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // already connected
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-app", {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("DB Connected");
};