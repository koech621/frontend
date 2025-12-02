import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";

interface RegisterFormInputs {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role: "farmer" | "customer";
}

const schema = yup.object({
  full_name: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().min(10, "Phone must be at least 10 digits").required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["farmer", "customer"], "Select a valid role").required("Role is required"),
}).required();

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setSuccessMsg("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); // redirect to homepage
      }, 1500); // 1.5s delay
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <input type="text" {...register("full_name")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.full_name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register("email")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone</label>
          <input type="text" {...register("phone")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register("password")} className="w-full border px-3 py-2 rounded" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1">Role</label>
          <select {...register("role")} className="w-full border px-3 py-2 rounded">
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
          </select>
          <p className="text-red-500 text-sm">{errors.role?.message}</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
