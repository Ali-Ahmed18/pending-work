import Express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Router/routes.js";
import cloudinary from "cloudinary"
dotenv.config();
const app = Express();
const PORT = 5000;

// Body Parse
app.use(Express.json());
app.use(urlencoded({ extended: true }));

// crossOrigin middleware/
app.use(cors());

// router//
app.use(router)

// ConnectMongodb
mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));



cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});


app.get("/", (req, res) => {
  res.json("server is up");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
