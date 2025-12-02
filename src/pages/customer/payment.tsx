import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Payments() {
  const cart = useSelector((state: RootState) => state.cart.items);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.product_name}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 text-right font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
