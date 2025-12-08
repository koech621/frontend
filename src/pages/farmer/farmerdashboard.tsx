import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../components/Dashboardlayout";
import ProductCard from "../../components/ProductCard";
import { fetchProducts, removeProduct } from "../../store/productSlice";
import { fetchFarmerOrders } from "../../store/orderSlice";
import type { RootState, AppDispatch } from "../../store/store";
import type { Product } from "../../store/productSlice";
import { FaPlus, FaClipboardList, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function FarmerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const { items: orders } = useSelector((state: RootState) => state.order);
  const { user } = useSelector((state: RootState) => state.auth);

  // Authorization guard (optional - route ProtectedRoute should already protect)
  if (!user || user.role !== "farmer")
    return (
      <div className="p-6">
        <p className="text-red-500">Not authorized</p>
      </div>
    );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFarmerOrders());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  const myProducts: Product[] = items.filter((p) => p.farmer_id === user.id);

  // Replace with real values when you wire orders/revenue into store
  const totalProducts = myProducts.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user.full_name ?? "Farmer"}.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/farmer/new"
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition"
            >
              <FaPlus /> Add Product
            </Link>

            <Link
              to="/farmer/orders"
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaClipboardList /> View Orders
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded">
              <FaPlus className="text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Products</div>
              <div className="text-xl font-bold">{totalProducts}</div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <FaClipboardList className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Orders</div>
              <div className="text-xl font-bold">{totalOrders}</div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4 flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded">
              <FaTruck className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-xl font-bold">Ksh{totalRevenue}</div>
            </div>
          </div>
        </div>

        {/* Products section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Products</h2>
            <p className="text-sm text-gray-500">{totalProducts} items</p>
          </div>

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {myProducts.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-gray-500">You have no products yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onDelete={() => handleDelete(product.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
