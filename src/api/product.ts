import axios from "axios";
import type { Product } from "../store/productSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api/products", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// FETCH all products (GET)
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

// FETCH one product by ID (GET)
export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// CREATE new product (POST)
export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await api.post("/products", product);
  return res.data;
};

// UPDATE product (PUT)
export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product> => {
  const res = await api.put(`/products/${id}`, updates);
  return res.data;
};

// DELETE product (DELETE)
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};