import express from "express";
import User from "../models/User.js";
import adminAuth from "../middleware/authAdmin.js";

const router = express.Router();

// Get all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add user
router.post("/users", adminAuth, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User added", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put("/users/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
