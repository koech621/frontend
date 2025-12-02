import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addProduct } from "../store/productSlice";
import type { Product } from "../store/productSlice";

type ProductFormInputs = Omit<Product, "id" | "farmer_id">;

export default function AddProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const farmer = useSelector((state: RootState) => state.auth.user);
  const [success, setSuccess] = useState(false); 

  const { register, handleSubmit, reset, } = useForm<ProductFormInputs>();

  const onSubmit = (data: ProductFormInputs) => {
    if (!farmer?.id) {
      alert("Farmer not logged in");
      return;
    }

    dispatch(addProduct({ ...data, farmer_id: farmer.id }))
      .unwrap() // unwrap promise to catch errors
      .then(() => {
        setSuccess(true); // show success message
        reset(); // clear form
        setTimeout(() => setSuccess(false), 3000); 
      })
      .catch(() => {
        alert("Failed to add product");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      {/*  Success message */}
      {success && (
        <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
          Product successfully added!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <input type="text" placeholder="Product Name" {...register("product_name", { required: true })} />
        {/* Category */}
        <input type="text" placeholder="Category" {...register("category")} />
        {/* Stock Quantity */}
        <input type="number" placeholder="Quantity" {...register("stock_quantity", { required: true, valueAsNumber: true })} />
        {/* Price */}
        <input type="number" placeholder="Price" {...register("price", { required: true, valueAsNumber: true })} />
        {/* Description */}
        <textarea placeholder="Description" {...register("description")} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</button>
      </form>
    </div>
  );
}
