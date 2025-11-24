import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function FarmerDashboard() {
  const products = useSelector((state: RootState) => state.products.items);
  const orders = useSelector((state: RootState) => state.order.items); // farmer orders slice later

  // Example metrics
  const myProducts = products.filter(p => p.farmerId === 1); // replace with logged-in farmerId
  const myOrders = orders.filter(o =>
    o.items.some(i => i.farmerId === 1)
  );

  const totalSales = myOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">Products</h2>
          <p className="text-2xl font-bold">{myProducts.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">Orders</h2>
          <p className="text-2xl font-bold">{myOrders.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">Total Sales</h2>
          <p className="text-2xl font-bold">KES {totalSales}</p>
        </div>
      </div>
    </div>
  );
}
