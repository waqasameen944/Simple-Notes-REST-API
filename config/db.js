import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const state = mongoose.connection.readyState;

    if (state === 1) return console.log("Database already connected");
    if (state === 2) return console.log("Database connection is in progress");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Database connected");
  } catch (error) {
    console.log(`❌  ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
