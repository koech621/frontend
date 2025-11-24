import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchOrders } from "../../store/orderSlice";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  const farmerId = 1; // replace with logged-in farmer

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const myOrders = items.filter(o =>
    o.items.some(i => i.farmerId === farmerId)
  );

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Order #{order.id}</span>
                <span className="font-semibold">{order.status}</span>
              </div>
              <div className="text-gray-600">
                {order.items
                  .filter(i => i.farmerId === farmerId)
                  .map((item) => (
                    <p key={item.id}>
                      {item.name} x {item.quantity}
                    </p>
                  ))}
              </div>
              <div className="mt-2 font-bold">
                Total: KES {myOrders.reduce((sum, o) => sum + o.total, 0)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
