import express from "express";
import multer from "multer";
import path from "path";
import { addProduct, getAllItems, getItemById, getItemsBySeller } from "../controllers/itemController.js";

const router = express.Router();

// -----------------------
// MULTER STORAGE
// -----------------------
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

// -----------------------
// ROUTES
// -----------------------

// ADD ITEM (file upload)
router.post("/add", upload.single("image"), addProduct);

// GET ALL
router.get("/", getAllItems);

// GET BY SELLER
router.get("/seller/:id", getItemsBySeller);

// GET SINGLE
router.get("/:id", getItemById);

export default router;
