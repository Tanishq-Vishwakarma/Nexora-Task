import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

export default mongoose.model("Cart", cartSchema);

