// src/App.tsx
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
import FarmerDashboard from "./pages/farmer/farmerdashboard";
import AddProductForm from "./components/AddProductform";
import FarmerOrders from "./pages/farmer/order";
import Login from "./pages/login";
import Register from "./pages/register";
import Payments from "./pages/customer/payment";

export default function App() {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
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
        <Route
         path="/cart"
             element={
        <ProtectedRoute isAllowed={isLoggedIn && role === "customer"}>
         <Payments />
         </ProtectedRoute>
  }
/>

        {/* Farmer Pages */}
        
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/new"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <AddProductForm />
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

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
