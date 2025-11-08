import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/currencyFormatter";

const CartItem = ({ item }) => {
  const { removeFromCart, updateCartItem, loading } = useCart();
  const MAX_QUANTITY = 10;
  
  // Get available stock (default to MAX_QUANTITY if stock is not available)
  const availableStock = item.stock !== undefined ? item.stock : MAX_QUANTITY;
  const maxAllowed = Math.min(MAX_QUANTITY, availableStock);
  const isMaxReached = item.qty >= maxAllowed;

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    if (newQty > maxAllowed) {
      alert(`Maximum quantity allowed is ${maxAllowed}. ${availableStock < MAX_QUANTITY ? `Only ${availableStock} items available in stock.` : `Maximum quantity limit is ${MAX_QUANTITY} items.`}`);
      return;
    }
    try {
      await updateCartItem(item._id, newQty);
    } catch (error) {
      alert(error.message || "Failed to update quantity");
    }
  };

  const handleRemove = async () => {
    if (window.confirm("Remove this item from cart?")) {
      try {
        await removeFromCart(item._id);
      } catch (error) {
        alert("Failed to remove item");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center gap-4">
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {item.name}
        </h3>
        <p className="text-gray-600">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.qty - 1)}
            disabled={loading || item.qty <= 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            −
          </button>
          <span className="text-lg font-semibold w-8 text-center">
            {item.qty}
          </span>
          <button
            onClick={() => handleQuantityChange(item.qty + 1)}
            disabled={loading || isMaxReached}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition"
            title={isMaxReached ? `Maximum quantity reached (${maxAllowed})` : "Increase quantity"}
          >
            +
          </button>
        </div>
        {isMaxReached && (
          <span className="text-xs text-red-600 font-medium">
            Max: {maxAllowed}
          </span>
        )}
        <div className="text-right min-w-[100px]">
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(item.subtotal)}
          </p>
        </div>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

