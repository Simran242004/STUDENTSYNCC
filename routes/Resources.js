import express from "express";
import Resource from "../models/Resource.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload a resource
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, fileUrl } = req.body;
    const resource = new Resource({
      title,
      description,
      price,
      fileUrl,
      uploadedBy: req.user.id,
    });
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload resource" });
  }
});

// Get user's resources
router.get("/my", verifyToken, async (req, res) => {
  const resources = await Resource.find({ uploadedBy: req.user.id });
  res.json(resources);
});

export default router;
