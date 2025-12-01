import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Admin imports (ESM)
import adminAuth from "./routes/adminAuth.js";
import adminPanel from "./routes/adminPanel.js";


// Other routes
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/itemRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

// ---------------------------
// 📁 PATH SETUP FOR ES MODULES
// ---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ❌ REMOVE THESE — they break ES modules
// const adminAuth = require("./routes/adminAuth");
// const adminPanel = require("./routes/adminPanel");

// ---------------------------
// 🛡️ SECURITY + CORE MIDDLEWARE
// ---------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cookieParser());
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

// ---------------------------
// 📁 SERVE UPLOADED IMAGES
// ---------------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------------
// 📌 API ROUTES
// ---------------------------
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);

// Admin routes
app.use("/api/admin", adminAuth);
app.use("/api/admin-panel", adminPanel);

// ---------------------------
// 🔌 CONNECT TO MONGO
// ---------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ---------------------------
// 🚀 START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
