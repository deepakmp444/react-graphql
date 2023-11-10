import mongoose from "mongoose";
import env from "../config/index.js";

let isConnected;
let db;

const connectDB = async () => {
  if (isConnected) return db;

  try {
    db = await mongoose.connect(env.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });

    isConnected = db.connections[0].readyState;
    return db;
  } catch (err) {
    console.log("err:", err.message);
    throw new Error(err);
  }
};

export default connectDB;
