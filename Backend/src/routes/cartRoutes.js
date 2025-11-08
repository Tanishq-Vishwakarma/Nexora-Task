import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem
} from "../controllers/cartController.js";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);
router.put("/:id", updateCartItem);
router.post("/checkout", checkout);

export default router;

