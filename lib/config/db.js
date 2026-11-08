import mongoose from "mongoose";

let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

export const ConnectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      .then((m) => {
        console.log("DB Connected");
        return m;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // allow retry on next request
    throw e;
  }
  return cached.conn;
};