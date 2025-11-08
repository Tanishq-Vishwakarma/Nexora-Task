import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, qty = 1) => {
    try {
      setAddingProductId(productId);
      setError(null);
      await api.addToCart(productId, qty);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError(err.message);
      console.error("Error adding to cart:", err);
      throw err;
    } finally {
      setAddingProductId(null);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.removeFromCart(id);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError(err.message);
      console.error("Error removing from cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (id, qty) => {
    try {
      setLoading(true);
      setError(null);
      await api.updateCartItem(id, qty);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError(err.message);
      console.error("Error updating cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Checkout
  const checkout = async (name, email) => {
    try {
      setLoading(true);
      setError(null);
      const receipt = await api.checkout(name, email, cart.items);
      await fetchCart(); // Refresh cart (should be empty after checkout)
      return receipt;
    } catch (err) {
      setError(err.message);
      console.error("Error during checkout:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    addingProductId,
    addToCart,
    removeFromCart,
    updateCartItem,
    fetchCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

