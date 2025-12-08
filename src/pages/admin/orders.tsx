import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/adminOrders";
import { getDrivers, assignLogistics } from "../../api/adminLogistics";
import { updateProduct } from "../../api/product";
import { Link } from "react-router-dom";

interface Driver {
  user_id: number;
  full_name: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [selectedOrderForStock, setSelectedOrderForStock] = useState<any | null>(null);
  const [form, setForm] = useState({
    vehicle_number_plate: "",
    transport_mode: "",
    pickup_location: "",
    dropoff_location: "",
  });
  const [stockForm, setStockForm] = useState({
    newStock: "",
  });

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const fetchDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data || []);
  };

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    fetchOrders();
  };

  const handleAssign = async () => {
    if (!selectedOrder) return;
    try {
      await assignLogistics({
        order_id: selectedOrder,
        vehicle_number_plate: form.vehicle_number_plate,
        transport_mode: form.transport_mode,
        pickup_location: form.pickup_location,
        dropoff_location: form.dropoff_location,
      });
      alert("Driver assigned successfully");
      setSelectedOrder(null);
      setForm({
        vehicle_number_plate: "",
        transport_mode: "",
        pickup_location: "",
        dropoff_location: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to assign driver");
    }
  };

  const handleRegulateStock = async () => {
    if (!selectedOrderForStock) return;
    const newStock = parseInt(stockForm.newStock);
    if (isNaN(newStock) || newStock < 0) {
      alert("Please enter a valid stock quantity");
      return;
    }
    try {
      await updateProduct(selectedOrderForStock.product_id, { stock_quantity: newStock });
      alert("Stock updated successfully");
      setSelectedOrderForStock(null);
      setStockForm({ newStock: "" });
      // Optionally refresh orders or products
    } catch (err) {
      console.error(err);
      alert("Failed to update stock");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Orders</h1>

      <table className="w-full border-collapse">
        <thead>
           <tr className="border-b">
             <th className="p-2">Order ID</th>
             <th className="p-2">Customer</th>
             <th className="p-2">Product</th>
             <th className="p-2">Qty</th>
             <th className="p-2">Total</th>
             <th className="p-2">Status</th>
             <th className="p-2">Logistics</th>
             <th className="p-2">Regulate Stock</th>
           </tr>
         </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.order_id} className="border-b">
              <td className="p-2">{order.order_id}</td>
              <td className="p-2">{order.user_name}</td>
              <td className="p-2">{order.product_name}</td>
              <td className="p-2">{order.quantity}</td>
              <td className="p-2">Ksh {order.total_amount}</td>

              <td className="p-2">
                <select
                  className="border p-1"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.order_id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td className="p-2">
                <button
                  onClick={() => setSelectedOrder(order.order_id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Assign Driver
                </button>
              </td>

              <td className="p-2">
                <button
                  onClick={() => setSelectedOrderForStock(order)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Regulate Stock
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Assign Driver for Order #{selectedOrder}</h2>

            <div className="space-y-3">
              <input
                className="border p-2 w-full"
                placeholder="Vehicle Number Plate"
                value={form.vehicle_number_plate}
                onChange={(e) => setForm({ ...form, vehicle_number_plate: e.target.value })}
              />

              <input
                className="border p-2 w-full"
                placeholder="Transport mode (Bike, Pickup, Truck...)"
                value={form.transport_mode}
                onChange={(e) => setForm({ ...form, transport_mode: e.target.value })}
              />

              <input
                className="border p-2 w-full"
                placeholder="Pickup location"
                value={form.pickup_location}
                onChange={(e) => setForm({ ...form, pickup_location: e.target.value })}
              />

              <input
                className="border p-2 w-full"
                placeholder="Dropoff location"
                value={form.dropoff_location}
                onChange={(e) => setForm({ ...form, dropoff_location: e.target.value })}
              />

              <div className="flex space-x-2">
                <button
                  onClick={handleAssign}
                  className="bg-green-600 text-white px-4 py-2 rounded flex-1"
                >
                  Assign
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrderForStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Regulate Stock for {selectedOrderForStock.product_name}</h2>
            <p className="mb-4">Order Quantity: {selectedOrderForStock.quantity}</p>

            <div className="space-y-3">
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="New Stock Quantity"
                value={stockForm.newStock}
                onChange={(e) => setStockForm({ newStock: e.target.value })}
              />

              <div className="flex space-x-2">
                <button
                  onClick={handleRegulateStock}
                  className="bg-green-600 text-white px-4 py-2 rounded flex-1"
                >
                  Update Stock
                </button>
                <button
                  onClick={() => setSelectedOrderForStock(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
