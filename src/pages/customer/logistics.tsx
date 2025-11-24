import { useState } from "react";

export default function Logistics() {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Logistics & Delivery</h1>

      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Delivery Option</h2>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="delivery" checked={deliveryType === "delivery"} onChange={() => setDeliveryType("delivery")} />
          <span>Home Delivery</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="radio" name="delivery" checked={deliveryType === "pickup"} onChange={() => setDeliveryType("pickup")} />
          <span>Pickup Point</span>
        </label>
      </div>

      {deliveryType === "delivery" && (
        <div className="bg-white shadow rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
          <input type="text" placeholder="Full Name" className="border p-3 rounded w-full mb-3" />
          <input type="text" placeholder="Phone Number" className="border p-3 rounded w-full mb-3" />
          <input type="text" placeholder="County" className="border p-3 rounded w-full mb-3" />
          <input type="text" placeholder="Town" className="border p-3 rounded w-full mb-3" />
          <input type="text" placeholder="Street / Landmark" className="border p-3 rounded w-full" />
        </div>
      )}

      {deliveryType === "pickup" && (
        <div className="bg-white shadow rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Pickup Locations</h2>
          <select className="border p-3 rounded w-full">
            <option>CBD Pickup Point</option>
            <option>Westside Mall Pickup Point</option>
          </select>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Delivery Cost</h2>
        <div className="flex justify-between font-bold">
          <span>{deliveryType === "delivery" ? "Home Delivery" : "Pickup"}</span>
          <span>{deliveryType === "delivery" ? "KES 250" : "KES 0"}</span>
        </div>
        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          Confirm Logistics
        </button>
      </div>
    </div>
  );
}
