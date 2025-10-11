import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.get("/", (req, res) => {
  res.send("🚀 MERN Blog API is running successfully!");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
