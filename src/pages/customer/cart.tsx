import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/cartSlice";

import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  // Calculate total
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              {/* Product Info */}
              <div>
                <h2 className="text-lg font-semibold">{item.product_name}</h2>
                <p className="text-gray-600">Price: Ksh {item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  <FaMinus />
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="bg-green-100 p-4 rounded shadow text-xl font-bold">
            Total: Ksh {totalPrice}
          </div>
        </div>
      )}
    </div>
  );
}
