import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/currencyFormatter";

const ProductCard = ({ product }) => {
  const { addToCart, addingProductId, cart } = useCart();
  const isAdding = addingProductId === product._id;
  const isDisabled = addingProductId !== null; // Disable all buttons when any product is being added
  
  // Get total stock from product
  const totalStock = product.stock !== undefined ? product.stock : 10;
  
  // Find how many of this product are already in the cart
  const cartItem = cart.items?.find(item => item.productId === product._id);
  const itemsInCart = cartItem ? cartItem.qty : 0;
  
  // Calculate available stock (total stock minus items in cart)
  const availableStock = Math.max(0, totalStock - itemsInCart);
  
  // Check if product is out of stock or if no more can be added
  const isOutOfStock = availableStock <= 0;
  const canAddToCart = !isOutOfStock && !isDisabled && availableStock > 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || availableStock <= 0) {
      alert("This product is out of stock");
      return;
    }
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      alert(error.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">
          {formatCurrency(product.price)}
        </p>
        {totalStock !== undefined && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {availableStock > 0 ? (
                <>
                  <span className="font-medium text-green-600">
                    Available: {availableStock} {availableStock === 1 ? 'item' : 'items'}
                  </span>
                  {itemsInCart > 0 && (
                    <span className="text-gray-500 ml-2">
                      ({itemsInCart} in cart)
                    </span>
                  )}
                </>
              ) : (
                <span className="font-medium text-red-600">Out of Stock</span>
              )}
            </p>
            {itemsInCart > 0 && availableStock > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Total stock: {totalStock} • In cart: {itemsInCart} • Available: {availableStock}
              </p>
            )}
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`w-full py-2 px-4 rounded-lg transition font-medium ${
            isOutOfStock || availableStock <= 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          {isOutOfStock || availableStock <= 0 ? "Out of Stock" : isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

