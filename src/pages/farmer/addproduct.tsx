import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { addProduct } from "../../store/productSlice";

type ProductFormInputs = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
};

export default function AddProductForm() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>();

  const onSubmit = (data: ProductFormInputs) => {
    if (!user?.id) {
      alert("You must be logged in as a farmer!");
      return;
    }

    dispatch(addProduct({ ...data, farmer_id: user.id }));
    reset();
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            {...register("product_name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.product_name && (
            <p className="text-red-600 text-sm">{errors.product_name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Stock Quantity</label>
          <input
            type="number"
            {...register("stock_quantity", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
