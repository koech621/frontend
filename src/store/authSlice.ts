import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../api/auth";
import type { AuthResponse } from "../api/auth";

export type UserRole = "farmer" | "customer" | null;

export interface AuthUser {
  id: number | null;
  email: string | null;
  full_name: string | null;
  role: string | null;
}

export interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  user: AuthUser | null;
}

// ---- INITIAL STATE ----
const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  user: localStorage.getItem("id")
    ? {
        id: Number(localStorage.getItem("id")),
        email: localStorage.getItem("email"),
        full_name: localStorage.getItem("full_name"),
        role: localStorage.getItem("role"),
      }
    : null,
};

// ---- LOGIN ----
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload); // Backend returns: { token, user }
      return data as AuthResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ---- REGISTER ----
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: { full_name: string; email: string; password: string; role: UserRole },
    { rejectWithValue }
  ) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ---- SLICE ----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.token = null;
      state.user = null;
      state.error = null;

      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    // LOGIN PENDING
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // LOGIN SUCCESS
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.isLoggedIn = true;

        // Save token
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        // Save role
        state.role = action.payload.user.role;
        localStorage.setItem("role", action.payload.user.role ?? "");

        // Save full user
        state.user = {
          id: action.payload.user.id,
          email: action.payload.user.email,
          full_name: action.payload.user.full_name,
          role: action.payload.user.role,
        };

        // Save safely to localStorage
        localStorage.setItem("id", String(action.payload.user.id));
        localStorage.setItem("email", action.payload.user.email ?? "");
        localStorage.setItem("full_name", action.payload.user.full_name ?? "");
      }
    );

    // LOGIN FAIL
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // REGISTER PENDING
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // REGISTER SUCCESS
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ token: string; role?: UserRole }>) => {
        state.loading = false;
        state.isLoggedIn = true;

        state.token = action.payload.token;
        state.role = action.payload.role ?? null;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role ?? "");
      }
    );

    // REGISTER FAIL
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
