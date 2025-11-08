import { useState, useEffect } from "react";
import { api } from "../services/api";
import ProductCard from "../components/ProductCard";

const Products = ({ searchQuery = "" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        
        // If search query is empty or just whitespace, fetch all products
        if (!searchQuery || searchQuery.trim() === "") {
          // Get all products
          data = await api.getProducts();
        } else {
          // Search products
          data = await api.searchProducts(searchQuery.trim());
        }
        
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Always fetch products when searchQuery changes
    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Our Products"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {!loading && products.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          {searchQuery
            ? `No products found for "${searchQuery}". Try a different search term.`
            : "No products available at the moment."}
        </div>
      )}
    </div>
  );
};

export default Products;

