import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import api from "../services/api";

// Order type matching backend
export interface Order {
  order_id: number;
  user_id: number;
  product_id: number;
  market_id: number;
  quantity: number;
  total_amount: number;
  order_date: string;
  status: string;
  product_name?: string; // to be added
}

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch orders from API
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.get("/order");
  return response.data as Order[];
});

// Fetch farmer orders from API
export const fetchFarmerOrders = createAsyncThunk("orders/fetchFarmerOrders", async () => {
  const response = await api.get("/farmer/orders");
  return response.data as Order[];
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch orders";
    });
    builder.addCase(fetchFarmerOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFarmerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFarmerOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch farmer orders";
    });
  },
});

export default ordersSlice.reducer;
