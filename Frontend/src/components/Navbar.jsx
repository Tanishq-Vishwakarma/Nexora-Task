import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch }) => {
  const { cart } = useCart();
  const location = useLocation();
  const itemCount = cart.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  const isActive = (path) => location.pathname === path;
  const showSearch = location.pathname === "/";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold hover:text-yellow-200 transition">
            Vibe Commerce
          </Link>
          
          {showSearch && onSearch && (
            <div className="w-full md:w-auto md:flex-1 md:max-w-md mx-auto md:mx-0">
              <SearchBar onSearch={onSearch} />
            </div>
          )}
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`transition font-medium ${
                isActive("/")
                  ? "text-yellow-300 font-bold underline decoration-2 underline-offset-4"
                  : "hover:text-yellow-200"
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`relative transition font-medium ${
                isActive("/cart")
                  ? "text-yellow-300 font-bold underline decoration-2 underline-offset-4"
                  : "hover:text-yellow-200"
              }`}
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

