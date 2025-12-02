import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/product";


export interface Product {
  id: number;
  farmer_id: number;
  product_name: string;
  category: string;
  price: number;
  stock_quantity: number;
  description?: string;
}

// FETCH
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProducts();
});

// CREATE
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    return await createProduct(product);
  }
);

// UPDATE
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updates }: { id: number; updates: Partial<Product> }) => {
    return await updateProduct(id, updates);
  }
);

// DELETE
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: number) => {
    await deleteProduct(id);
    return id;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: { items: [] as Product[], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      // CREATE
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // UPDATE
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      // DELETE
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});
export default productsSlice.reducer;
