import express from "express";
import Message from "../models/messageModel.js";

const router = express.Router();

router.post("/send", async (req, res) => {
const { sellerId, message, meetingPoint, meetingTime } = req.body;

  if (!sellerId || !message)
    return res.status(400).json({ error: "Missing data" });

  try {
   const newMsg = await Message.create({
  sellerId,
  message,
  meetingPoint,
  meetingTime,
});

    res.json({ success: true, message: newMsg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
