import axios from "axios";
import type { Product } from "../store/productSlice";

const API_BASE = "http://localhost:3000/api/products";

// Helper to get the token from localStorage
const getToken = () => localStorage.getItem("token");

export const getProducts = async (): Promise<Product[]> => {
  const token = getToken();

  const res = await axios.get(API_BASE, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const token = getToken();
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.data;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const token = getToken();
  const res = await axios.post(API_BASE, product, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.data;
};

export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product> => {
  const token = getToken();
  const res = await axios.put(`${API_BASE}/${id}`, updates, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const token = getToken();
  await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
};