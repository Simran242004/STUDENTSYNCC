import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

// File storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ======================
// 📌 GET ALL PRODUCTS
// ======================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ======================
// 📌 UPLOAD ITEM
// ======================
router.post(
  "/upload",
  verifyToken,
  upload.fields([{ name: "image" }, { name: "userProfile" }]),
  async (req, res) => {
    try {
      const { title, price, category, description } = req.body;
      const image = req.files?.image?.[0]?.filename;
      const profile = req.files?.userProfile?.[0]?.filename;

      const product = new Product({
        title,
        price,
        category,
        description,
        image,
        userProfile: profile,
        userId: req.user.id,
      });

      await product.save();
      res.json({ message: "Item uploaded successfully!", product });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
