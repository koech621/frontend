import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../api/auth";
import type { AuthResponse } from "../api/auth";

export type UserRole = "farmer" | "customer" | "admin" | null;

export interface AuthUser {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
}

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  role: UserRole;
  loading: boolean;
  error: string | null;
  user: AuthUser | null;
}

//Utility: Normalize backend user structure → frontend format
const normalizeUser = (rawUser: any): AuthUser => ({
  id: rawUser.id ?? rawUser.user_id,     // FIXED MAPPING
  email: rawUser.email,
  full_name: rawUser.full_name,
  role: rawUser.role,
});

// Load from localStorage safely
const loadStoredUser = (): AuthUser | null => {
  const id = localStorage.getItem("id");
  if (!id) return null;

  return {
    id: Number(id),
    email: localStorage.getItem("email") || "",
    full_name: localStorage.getItem("full_name") || "",
    role: (localStorage.getItem("role") as UserRole) || null,
  };
};

// ---- INITIAL STATE ----
const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  role: (localStorage.getItem("role") as UserRole) || null,
  loading: false,
  error: null,
  user: loadStoredUser(),
};

// ---- LOGIN ----
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload); // returns { token, user }
      return response as AuthResponse;
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
      const response = await authApi.register(payload);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.clear();
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
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.isLoggedIn = true;

        // Normalize user
        const normalized = normalizeUser(action.payload.user);

        // Save state
        state.user = normalized;
        state.token = action.payload.token;
        state.role = normalized.role;

        // Persist
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("id", String(normalized.id));
        localStorage.setItem("email", normalized.email);
        localStorage.setItem("full_name", normalized.full_name);
        localStorage.setItem("role", normalized.role ?? "");
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

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;

      const normalized = normalizeUser(action.payload.user);

      state.user = normalized;
      state.token = action.payload.token;
      state.role = normalized.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", String(normalized.id));
      localStorage.setItem("email", normalized.email);
      localStorage.setItem("full_name", normalized.full_name);
      localStorage.setItem("role", normalized.role ?? "");
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
