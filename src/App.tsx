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
import CustomerPayments from "./pages/customer/payments";
import FarmerDashboard from "./pages/farmer/farmerdashboard";
import AddProductForm from "./components/AddProductform";
import FarmerOrders from "./pages/farmer/order";
import FarmerLogistics from "./pages/farmer/logistics";
import FarmerPayments from "./pages/farmer/payments";
import Login from "./pages/login";
import Register from "./pages/register";
import Payments from "./pages/customer/payment";
import AdminDashboard from "./pages/admin/admindashboard"
import Orders from "./pages/admin/orders";
import AdminPayments from "./pages/admin/payments";
import Drivers from "./pages/admin/drivers";

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
          path="/payments"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "customer"}>
              <CustomerPayments />
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
        <Route
          path="/farmer/logistics"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <FarmerLogistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/payments"
          element={
            <ProtectedRoute isAllowed={isLoggedIn && role === "farmer"}>
              <FarmerPayments />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/dashboard"
        element={
        <ProtectedRoute isAllowed={isLoggedIn && role === "admin"}>
        <AdminDashboard />
        </ProtectedRoute>
              }
         />
        <Route
        path="/admin/orders"
       element={
        <ProtectedRoute isAllowed={isLoggedIn && role === "admin"}>
        <Orders />
       </ProtectedRoute>
       }
        />
       <Route
       path="/admin/payments"
       element={
       <ProtectedRoute isAllowed={isLoggedIn && role === "admin"}>
       <AdminPayments />
       </ProtectedRoute>
       }
      />
      <Route
      path="/admin/drivers"
      element={
      <ProtectedRoute isAllowed={isLoggedIn && role === "admin"}>
      <Drivers />
    </ProtectedRoute>
     }
      />



        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
