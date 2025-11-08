import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  stock: {
    type: Number,
    required: true,
    default: 10,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);

