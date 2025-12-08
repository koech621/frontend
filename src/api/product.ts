import api from "../services/api";
import type { Product } from "../store/productSlice";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await api.post("/products", product);
  return res.data;
};

export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product> => {
  const res = await api.put(`/products/${id}`, updates);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};