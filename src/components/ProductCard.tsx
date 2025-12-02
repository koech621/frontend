import type { Product } from "../store/productSlice";
import { FaEdit, FaTrash, FaCartPlus } from "react-icons/fa";

interface ProductCardProps extends Product {
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  product_name,
  category,
  price,
  stock_quantity,
  description,
  onEdit,
  onDelete,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{product_name}</h3>
      <p>Category: {category}</p>
      <p>Price: Ksh {price}</p>
      <p>Stock: {stock_quantity}</p>
      {description && <p className="text-gray-500">{description}</p>}

      <div className="mt-3 flex gap-3">
        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <FaCartPlus />
            Add to Cart
          </button>
        )}

        {/* Edit Button */}
        {onEdit && (
          <button
            className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            onClick={onEdit}
          >
            <FaEdit />
            Edit
          </button>
        )}

        {/* Delete Button */}
        {onDelete && (
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={onDelete}
          >
            <FaTrash />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
