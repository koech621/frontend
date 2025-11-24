import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

// Example order type
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  farmerId: number; 
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
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

// Fetch orders from API (replace with your API call)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("/api/orders"); // adjust endpoint
  return (await response.json()) as Order[];
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
  },
});

export default ordersSlice.reducer;
