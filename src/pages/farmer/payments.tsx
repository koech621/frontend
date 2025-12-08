import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import api from "../../services/api";

export default function FarmerPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payment/farmer");
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
        setError("Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPayments();
    }
  }, [user]);

  if (loading) return <p className="p-6 text-center">Loading payments...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Payments Received</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">You have no payments yet.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: any) => (
            <div key={payment.payment_id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Payment #{payment.payment_id}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  payment.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.payment_status}
                </span>
              </div>
              <div className="text-gray-600 space-y-1">
                <p>Order ID: {payment.order_id}</p>
                <p>Payment Method: {payment.payment_method}</p>
                <p>Reference: {payment.reference || 'N/A'}</p>
                <p>Payment Date: {new Date(payment.payment_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}