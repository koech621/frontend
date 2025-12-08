import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchFarmerOrders } from "../../store/orderSlice";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(fetchFarmerOrders());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((order) => (
            <div key={order.order_id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Order #{order.order_id}</span>
                <span className="font-semibold">{order.status}</span>
              </div>
              <div className="text-gray-600">
                <p>
                  {order.product_name} x {order.quantity}
                </p>
              </div>
              <div className="mt-2 font-bold">
                Total: KES {order.total_amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
