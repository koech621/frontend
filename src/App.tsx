import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

// Components
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";

// Pages
import LandingPage from "./pages/customer/landingpage";
import CustomerProducts from "./pages/customer/products";
import CustomerOrders from "./pages/customer/order";
import FarmerProducts from "./pages/farmer/products";
import FarmerOrders from "./pages/farmer/order";
import Login from "./pages/login";
import Register from "./pages/register";


export default function App() {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<CustomerProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Customer Pages */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "customer"}>
              <CustomerOrders />
            </ProtectedRoute>
          }
        />

        {/* Farmer Pages */}
        <Route
          path="/farmer/products"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <FarmerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <FarmerOrders />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
