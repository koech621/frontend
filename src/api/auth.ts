import api from "../services/api";
import type { UserRole } from "../store/authSlice";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  phone?: string;
  role: "farmer" | "customer" | "admin" | null;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id:number;
    email:string;
    full_name: string;
    role: UserRole;
  };
}



export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", payload,{
    withCredentials:true
  }

  );
  return res.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", payload,{
    withCredentials: true
  }

  );
  return res.data;
};
