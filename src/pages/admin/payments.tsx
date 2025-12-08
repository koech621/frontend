import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../components/Dashboardlayout";
import { FaTachometerAlt, FaShoppingCart, FaCreditCard, FaTruck } from "react-icons/fa";

const adminNavItems = [
  { to: "/admin/dashboard", icon: <FaTachometerAlt className="text-green-700" />, label: "Dashboard" },
  { to: "/admin/orders", icon: <FaShoppingCart className="text-green-700" />, label: "Orders" },
  { to: "/admin/payments", icon: <FaCreditCard className="text-green-700" />, label: "Payments" },
  { to: "/admin/drivers", icon: <FaTruck className="text-green-700" />, label: "Drivers" },
];

export default function AdminPayments() {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const res = await api.get("/admin/orders/pending");
      setPendingOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch pending orders", err);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleApprovePayment = async (orderId: number) => {
    try {
      await api.post(`/admin/orders/${orderId}/approve-payment`);
      alert("Payment approved successfully!");
      fetchPendingOrders(); // Refresh the list
    } catch (err) {
      console.error("Failed to approve payment", err);
      alert("Failed to approve payment");
    }
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Payment Approvals</h1>

        <table className="w-full border-collapse bg-white rounded shadow">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Total Amount</th>
              <th className="p-4 text-left">Order Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingOrders.map((order: any) => (
              <tr key={order.order_id} className="border-b hover:bg-gray-50">
                <td className="p-4">{order.order_id}</td>
                <td className="p-4">{order.customer_name}</td>
                <td className="p-4">{order.product_name}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">Ksh {order.total_amount}</td>
                <td className="p-4">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleApprovePayment(order.order_id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Approve Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pendingOrders.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-gray-500 text-center">
            No pending orders for payment approval.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}