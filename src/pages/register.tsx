import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/authSlice"; 
import type { AppDispatch } from "../store/store";

interface RegisterFormInputs {
  full_name: string;
  email: string;
  password: string;
  phone:number;
  role: "farmer" | "customer";
}

const schema = yup.object({
  full_name: yup.string().required("fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone:yup.number().min(10,"Phone number must be atleast 10 numbers").required("Phone number is requred"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["farmer", "customer"], "Select a valid role").required("Role is required"),
}).required();

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">FullName</label>
          <input
            type="text"
            {...register("full_name")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.full_name?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="phone"
            {...register("phone")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select {...register("role")} className="w-full border px-3 py-2 rounded">
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
          </select>
          <p className="text-red-500 text-sm">{errors.role?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
