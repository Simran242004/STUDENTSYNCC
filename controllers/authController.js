import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------------
// SIGNUP
// --------------------
export const signupUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 1️⃣ Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Respond success
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------
// LOGIN
// --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "login failed" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Return exactly what frontend needs
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,  // <-- REQUIRED FOR POSTING ITEMS
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        college: user.college,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// --------------------
// GET USER BY ID
// --------------------
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "login failed" });

    res.json(user);
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------
// LOGOUT (FRONTEND HANDLES TOKEN REMOVE)
// --------------------
export const logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
