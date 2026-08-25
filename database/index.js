// import "dotenv/config";
import mongoose from "mongoose";

// export const connectDB = async (req, res) => {
//   await mongoose.connect("mongodb://127.0.0.1:27017/newcrewtailor");
//   console.log("connected to database");
// };

// Replace with your actual MongoDB Atlas connection string
const ATLAS_URI = process.env.MONGODB_URL;

export const connectMongoDbAtlas = async () => {
  // console.log(process.env.MONGODB_URL);
  await mongoose
    .connect(ATLAS_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB Atlas connection error:", err));
};
