import express from "express";
import { signupUser, loginUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

// User authentication routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// Fetch user by ID
router.get("/:id", getUserById);

export default router;
