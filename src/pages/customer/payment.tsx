import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { createOrder } from "../../api/payment";
import { increaseQuantity, decreaseQuantity,removeFromCart, clearCart } from "../../store/cartSlice";
import { FaTrash } from "react-icons/fa";

export default function Payments() {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  // Total amount
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const userId = user?.id ?? null;

  const handleCheckout = async () => {
    if (!userId) {
      alert("Please log in first");
      return;
    }

    try {
      for (const item of cart) {
        if (!item.id) continue;

        await createOrder({
          user_id: userId,
          product_id: item.id,
          market_id: 1,
          quantity: item.quantity,
          total_amount: item.price * item.quantity,
          order_date: new Date().toISOString(),
          status: "pending",
        });
      }

      alert("Payment Successful! Orders Created");
      dispatch(clearCart());
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Subtotal</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
  {cart.map((item) => (
    <tr key={item.id} className="border-b">
      <td className="p-2">{item.product_name}</td>
      <td className="p-2">Ksh {item.price.toFixed(2)}</td>

      {/* Quantity with + / – buttons */}
      <td className="p-2 flex items-center gap-2">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-2 rounded transition"
        >
          –
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-2 rounded transition"
        >
          +
        </button>
      </td>

      <td className="p-2">Ksh {(item.price * item.quantity).toFixed(2)}</td>
      <td className="p-2">
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 transition"
        >
          <FaTrash />
        
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>

          <div className="mt-4 text-right font-bold text-lg">
            Total: Ksh {total.toFixed(2)}
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Complete Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
