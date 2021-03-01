import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", () => console.error("Connection Error!"));
db.once("open", () => console.log("Connected!"));
