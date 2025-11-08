import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { generateReceipt } from "../utils/generateReceipt.js";

// Mock checkout
export const checkout = async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    // If cartItems are provided in request, use them; otherwise fetch from DB
    let items = [];
    let total = 0;

    if (cartItems && cartItems.length > 0) {
      // Use provided cartItems
      items = cartItems;
      total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    } else {
      // Fetch from database
      const cartData = await Cart.find({}).populate("productId");
      items = cartData.map(item => ({
        _id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        qty: item.qty,
        subtotal: item.productId.price * item.qty
      }));
      total = items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Generate receipt
    const receipt = generateReceipt(items, total, { name, email });

    // Clear cart after checkout
    await Cart.deleteMany({});

    res.status(200).json({
      success: true,
      message: "Checkout successful",
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during checkout",
      error: error.message
    });
  }
};

