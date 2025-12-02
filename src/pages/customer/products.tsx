import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice"; 
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 

export default function CustomerProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  const handleAddToCart = (productId: number) => {
    const product = items.find((p) => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="p-6">
      {/* Cart icon in the top-right corner */}
      <div className="flex justify-end mb-4">
        <Link to="/cart" className="relative text-2xl">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Available Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
