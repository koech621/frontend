import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type  {PayloadAction } from "@reduxjs/toolkit"

export type UserRole = "farmer" | "customer" | null;

export interface AuthState {
  isLoggedIn: boolean;
  role: UserRole;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  token: null,
  loading: false,
  error: null,
};

// API calls (replace URLs with your backend)
const API_BASE = "http://localhost:3000/api"; 

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, payload);
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: { full_name: string; email: string;phone :number; password: string; role: UserRole },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, payload);
      return res.data; // expects { token, role }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ token: string; role: UserRole }>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ token: string; role: UserRole }>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
