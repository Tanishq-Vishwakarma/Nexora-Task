const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch products");
    }
    return data.data;
  },

  searchProducts: async (query) => {
    const response = await fetch(`${API_BASE_URL}/api/products/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to search products");
    }
    return data.data;
  },

  // Cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/api/cart`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch cart");
    }
    return data.data;
  },

  addToCart: async (productId, qty) => {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, qty }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to add to cart");
    }
    return data.data;
  },

  removeFromCart: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to remove from cart");
    }
    return data;
  },

  updateCartItem: async (id, qty) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qty }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to update cart");
    }
    return data.data;
  },

  checkout: async (name, email, cartItems) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, cartItems }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Checkout failed");
    }
    return data.data;
  },
};

