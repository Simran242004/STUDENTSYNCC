import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// ✅ POST /api/upload — Protected upload route
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "userProfile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, price, category, description } = req.body;

      // ✅ Grab file names safely
      const image = req.files?.image?.[0]?.filename || null;
      const profile = req.files?.userProfile?.[0]?.filename || null;

      // ✅ Create and save product
      const product = new Product({
        title,
        price,
        category,
        description,
        image,
        userProfile: profile,
        userId: req.user?.id, // from token
      });

      await product.save();

      res.status(201).json({
        message: "✅ Item uploaded successfully!",
        product,
      });
    } catch (error) {
      console.error("❌ Upload error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// ✅ GET /api/items — Fetch all uploaded items
// router.get("/items", async (req, res) => {
//   try {
//     const items = await Product.find().sort({ createdAt: -1 });
//     res.json(items);
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     res.status(500).json({ message: "Failed to fetch items" });
//   }
// });

export default router;
