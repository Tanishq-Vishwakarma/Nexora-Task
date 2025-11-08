import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const MAX_QUANTITY = 10;

    if (!productId || !qty) {
      return res.status(400).json({
        success: false,
        message: "ProductId and quantity are required"
      });
    }

    if (qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({ productId });
    
    let newQuantity;
    if (existingCartItem) {
      // Calculate new quantity
      newQuantity = existingCartItem.qty + qty;
    } else {
      newQuantity = qty;
    }

    // Check max quantity limit (10)
    if (newQuantity > MAX_QUANTITY) {
      return res.status(400).json({
        success: false,
        message: `Maximum quantity limit is ${MAX_QUANTITY} items per product`
      });
    }

    // Check stock availability
    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock. Cannot add more.`
      });
    }

    if (existingCartItem) {
      // Update quantity
      existingCartItem.qty = newQuantity;
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated",
        data: existingCartItem
      });
    } else {
      // Create new cart item
      const cartItem = await Cart.create({ productId, qty });
      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        data: cartItem
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message
    });
  }
};

// Get cart with totals
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate("productId");
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.qty;
      total += itemTotal;
      return {
        _id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        stock: item.productId.stock,
        qty: item.qty,
        subtotal: itemTotal
      };
    });

    res.status(200).json({
      success: true,
      data: {
        items,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    
    const cartItem = await Cart.findByIdAndDelete(id);
    
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const MAX_QUANTITY = 10;

    if (!qty || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    // Check max quantity limit
    if (qty > MAX_QUANTITY) {
      return res.status(400).json({
        success: false,
        message: `Maximum quantity limit is ${MAX_QUANTITY} items per product`
      });
    }

    const cartItem = await Cart.findById(id).populate("productId");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    // Check stock availability
    if (qty > cartItem.productId.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${cartItem.productId.stock} items available in stock. Cannot update to ${qty}.`
      });
    }

    cartItem.qty = qty;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message
    });
  }
};

