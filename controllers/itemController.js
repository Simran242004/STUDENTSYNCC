import Product from "../models/Product.js";

// --------------------
// ADD PRODUCT / ITEM
// --------------------
export const addProduct = async (req, res) => {
  try {
    const { title, price, category, description, meetingPoint, userId } = req.body;
const image = req.file ? req.file.filename : null;


    if (!title || !price || !category || !meetingPoint || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = await Product.create({
      title,
      price,
      category,
      description,
      image,
      meetingPoint,
      userId,
    });

    res.status(201).json({
      message: "Item posted successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Add item error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------
// GET ALL ITEMS
// --------------------
export const getAllItems = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get all items error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------
// GET ITEM BY ID
// --------------------
export const getItemById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Item not found" });

    res.json(product);
  } catch (err) {
    console.error("Get item error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------
// GET ITEMS BY SELLER
// --------------------
export const getItemsBySeller = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    console.error("Get seller items error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
