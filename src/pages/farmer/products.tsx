import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { fetchProducts, removeProduct } from "../../store/productSlice";
import type { RootState, AppDispatch } from "../../store/store";
import type { Product } from "../../store/productSlice"; // type-only import

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const farmerId = 1; // replace with logged-in farmer ID

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (product: Product) => {
    dispatch(removeProduct(product.id));
  };

  // Filter products belonging to this farmer
  const myProducts: Product[] = items.filter((p) => p.farmerId === farmerId);

  if (loading) {
    return <p className="p-6 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Products</h1>

      <div className="mb-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Add New Product
        </button>
      </div>

      {myProducts.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleDelete(product)} // explicitly uses Product type
            />
          ))}
        </div>
      )}
    </div>
  );
}
