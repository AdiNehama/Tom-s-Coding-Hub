import mongoose from "mongoose";

const connectDB = () => {
  try {
    console.log(process.env.MONGO_URI);
    mongoose.connect("mongodb+srv://adinehama6:sErQDheDRZZGETy2@tomscodeapp.llq11.mongodb.net/");
    mongoose.connection.once("open", () => {
      console.log("[server] Connected to MongoDB successfully");
    });
  } catch (error:any) {

    console.log("[server] " + error.message);
    process.exit(-1);
  }
};
export default connectDB;
