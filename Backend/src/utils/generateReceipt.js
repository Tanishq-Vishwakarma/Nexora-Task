export const generateReceipt = (cartItems, total, customerInfo = {}) => {
  const receipt = {
    receiptId: `REC-${Date.now()}`,
    timestamp: new Date().toISOString(),
    customer: {
      name: customerInfo.name || "Guest",
      email: customerInfo.email || "guest@example.com"
    },
    items: cartItems.map(item => ({
      name: item.name,
      price: item.price,
      qty: item.qty,
      subtotal: item.subtotal
    })),
    total: total,
    status: "completed"
  };

  return receipt;
};

