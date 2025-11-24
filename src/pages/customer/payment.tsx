import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Payments() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Payment</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-1">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-semibold">KES {item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-3 text-lg">
              <span>Total:</span>
              <span>KES {total}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="payment" defaultChecked />
            <span>M-Pesa</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="payment" />
            <span>Card Payment</span>
          </label>
        </div>
        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
