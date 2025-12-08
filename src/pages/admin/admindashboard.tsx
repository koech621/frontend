import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboardlayout";
import { FaTachometerAlt, FaShoppingCart, FaCreditCard, FaTruck } from "react-icons/fa";
import { getLogistics, getDrivers } from "../../api/adminLogistics";

interface Logistics {
  logistics_id: number;
  order_id: number;
  delivery_agent_id: number;
  transport_mode: string;
  pickup_location: string;
  dropoff_location: string;
  delivered: boolean;
  delivery_date?: string;
}

interface Driver {
  user_id: number;
  full_name: string;
}

const adminNavItems = [
  { to: "/admin/dashboard", icon: <FaTachometerAlt className="text-green-700" />, label: "Dashboard" },
  { to: "/admin/orders", icon: <FaShoppingCart className="text-green-700" />, label: "Orders" },
  { to: "/admin/payments", icon: <FaCreditCard className="text-green-700" />, label: "Payments" },
  { to: "/admin/drivers", icon: <FaTruck className="text-green-700" />, label: "Drivers" },
];
export default function AdminDashboard() {
  const [logistics, setLogistics] = useState<Logistics[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logisticsData, driversData] = await Promise.all([
          getLogistics(),
          getDrivers(),
        ]);
        setLogistics(logisticsData || []);
        setDrivers(driversData || []);
      } catch (err) {
        console.error("Failed to fetch logistics or drivers:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/orders" className="p-4 bg-green-100 rounded shadow hover:bg-green-200 transition">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p>View and manage all customer orders</p>
          </Link>
          <Link to="/admin/payments" className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200 transition">
            <h2 className="text-xl font-semibold">Payments</h2>
            <p>Approve pending payments</p>
          </Link>
          <Link to="/admin/drivers" className="p-4 bg-yellow-100 rounded shadow hover:bg-yellow-200 transition">
            <h2 className="text-xl font-semibold">Drivers</h2>
            <p>Manage delivery drivers</p>
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Logistics Overview</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Order ID</th>
                  <th className="py-2 px-4 border-b">Driver</th>
                  <th className="py-2 px-4 border-b">Transport Mode</th>
                  <th className="py-2 px-4 border-b">Pickup Location</th>
                  <th className="py-2 px-4 border-b">Dropoff Location</th>
                  <th className="py-2 px-4 border-b">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {logistics.map((log) => (
                  <tr key={log.logistics_id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-center">{log.order_id}</td>
                    <td className="py-2 px-4 border-b">
                      {drivers.find(d => d.user_id === log.delivery_agent_id)?.full_name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{log.transport_mode}</td>
                    <td className="py-2 px-4 border-b">{log.pickup_location}</td>
                    <td className="py-2 px-4 border-b">{log.dropoff_location}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {log.delivered ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logistics.length === 0 && (
              <p className="text-gray-500 mt-4">No logistics assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
