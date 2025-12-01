import express from "express";
import { signupUser, loginUser, getUserById, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Auth test route working!");
});

// AUTH ROUTES
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);
router.post("/logout", logoutUser);

export default router;
