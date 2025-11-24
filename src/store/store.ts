import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/productSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./orderSlice";
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    order: ordersReducer,
    auth : authReducer
  },
});

// Types for components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
