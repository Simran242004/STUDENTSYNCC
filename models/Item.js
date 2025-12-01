import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: String,
});

export default mongoose.model("Item", itemSchema);
