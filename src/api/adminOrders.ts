import api from "../services/api"; // your Axios instance

export interface AdminOrder {
  order_id: number;
  user_id: number;
  product_id: number;
  market_id: number;
  quantity: number;
  total_amount: number;
  order_date: string;
  status: string;
  customer_name: string;
  product_name: string;
}
// Fetch all orders (admin view)
export const getAllOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

// Update order status (Delivered, Shipped, Cancelled, etc.)
export const updateOrderStatus = async (orderId: number, status: string) => {
  const res = await api.patch(`/admin/orders/${orderId}/status`, { status });
  return res.data;
};