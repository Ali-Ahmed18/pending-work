import Express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Router/routes.js";
import cloudinary from "cloudinary"

dotenv.config();
const app = Express();
const PORT = process.env.PORT || 5000;

app.use(Express.json());
app.use(urlencoded({ extended: true }));


app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(router);


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
  res.json("Server is up");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// app.options('/api/v1/likeposts/:id', (req, res) => {
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.status(200).send();
// });
