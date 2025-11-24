import type { Product } from "../store/productSlice";

interface ProductCardProps extends Product {
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  id,
  farmerId,
  farmerName,
  name,
  category,
  price,
  stockQuantity,
  description,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition flex flex-col justify-between">
      {/* Product Info */}
      <div>
        <h2 className="font-semibold text-lg mb-1">{name}</h2>
        {farmerName && (
          <p className="text-gray-500 text-sm mb-1">Farmer: {farmerName}</p>
        )}
        <p className="text-gray-500 text-sm mb-1">Category: {category}</p>
        <p className="text-green-700 font-bold mb-1">${price}</p>
        <p
          className={`text-sm mb-2 ${
            stockQuantity === 0 ? "text-red-500 font-bold" : "text-gray-600"
          }`}
        >
          {stockQuantity === 0 ? "Out of Stock" : `Stock: ${stockQuantity}`}
        </p>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
      </div>

      {/* Add to Cart Button */}
      {stockQuantity > 0 && onAddToCart && (
        <button
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() =>
            onAddToCart({
              id,
              farmerId,
              farmerName,
              name,
              category,
              price,
              stockQuantity,
              description,
            })
          }
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
