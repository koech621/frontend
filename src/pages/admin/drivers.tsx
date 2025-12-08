import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getDrivers,
  assignLogistics,
  getLogisticsByOrder,
  markDelivered
} from "../../api/adminLogistics";

interface Logistics {
  logistics_id: number;
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

export default function AdminLogistics() {
  const [searchParams] = useSearchParams();
  const orderId = Number(searchParams.get("order"));

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [logistics, setLogistics] = useState<Logistics | null>(null);

  const [form, setForm] = useState({
    delivery_agent_id: "",
    transport_mode: "",
    pickup_location: "",
    dropoff_location: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const fetchedDrivers = await getDrivers();
        setDrivers(fetchedDrivers || []);

        const fetchedLogistics = await getLogisticsByOrder(orderId);
        setLogistics(fetchedLogistics || null);
      } catch (err) {
        console.error("Failed to fetch drivers or logistics:", err);
      }
    })();
  }, [orderId]);

  const handleAssign = async () => {
  try {
    await assignLogistics({
      order_id: orderId,
      delivery_agent_id:Number (form.delivery_agent_id),
      transport_mode: form.transport_mode,
      pickup_location: form.pickup_location,
      dropoff_location: form.dropoff_location,
    });

    alert("Driver assigned successfully");

    // Refresh logistics state after assignment
    const updatedLogistics = await getLogisticsByOrder(orderId);
    setLogistics(updatedLogistics || null);
  } catch (err) {
    console.error(err);
    alert("Failed to assign driver");
  }
};


  const handleDelivered = async () => {
    if (!logistics?.logistics_id) return;
    try {
      await markDelivered(logistics.logistics_id);
      alert("Marked as delivered");

      // Update delivered status locally
      setLogistics({ ...logistics, delivered: true, delivery_date: new Date().toISOString() });
    } catch (err) {
      console.error(err);
      alert("Failed to mark as delivered");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Logistics for Order #{orderId}</h2>

      <div className="space-y-3">
        <div>
          <label className="font-semibold">Delivery Agent</label>
          <select
            className="border p-2 w-full"
            value={form.delivery_agent_id}
            onChange={(e) => setForm({ ...form, delivery_agent_id: e.target.value })}
          >
            <option value="">Select driver...</option>
            {drivers.map((d) => (
              <option key={d.user_id} value={d.user_id}>
                {d.full_name}
              </option>
            ))}
          </select>
        </div>

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

        <button
          onClick={handleAssign}
          className="bg-green-600 w-full text-white py-2 rounded"
        >
          Assign Delivery
        </button>

        {logistics ? (
          <>
            <p className="text-gray-700 mt-2">
              Assigned Driver: {drivers.find(d => d.user_id === logistics.delivery_agent_id)?.full_name || "N/A"}
            </p>
            <p className="text-gray-700">
              Delivered: {logistics.delivered ? "Yes" : "No"}
            </p>
            { !logistics.delivered && (
              <button
                onClick={handleDelivered}
                className="bg-blue-600 w-full text-white py-2 rounded mt-2"
              >
                Mark as Delivered
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-2">No logistics assigned yet.</p>
        )}
      </div>
    </div>
  );
}
