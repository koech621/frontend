import api from "../services/api";

// Create a new order
export const createOrder = async (orderData: {
  user_id: number;
  product_id: number;
  market_id: number;
  quantity: number;
  total_amount: number;
  order_date?: string;
  status?: string;
}) => {
  return await api.post("/order", orderData);
};

// Get all orders
export const getOrders = async () => {
  return await api.get("/orders");
};

//  Create a new payment
export const createPayment = async (paymentData: {
  order_id: number;
  payment_method: string;
  reference?: string;
  payment_status: string;
}) => {
  return await api.post("/payment", paymentData);
};
