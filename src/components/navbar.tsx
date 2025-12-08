import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { FaShoppingCart } from "react-icons/fa"; // import cart icon

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get user info and cart from Redux
  const { role, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total quantity for cart badge
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Links for different roles
  const linksByRole: Record<string, NavLink[]> = {
    public: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Market", path: "/market" },
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ],
    customer: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Orders", path: "/orders" },
      { name: "Payments", path: "/payments" },
    ],
    farmer: [
      { name: "Dashboard", path: "/farmer/Dashboard" },
      { name: "Orders", path: "/orders" },
      { name: "Logistics", path: "/logistics" },
      { name: "Payments", path: "/farmer/payments" },
    ],
    admin: [
  { name: "Admin Dashboard", path: "/admin/dashboard" },
  { name: "Manage Products", path: "/admin/products" },
  { name: "Manage Users", path: "/admin/users" },
  { name: "Orders", path: "/admin/orders" },
],

  };

  // Determine which links to show
  const links: NavLink[] =
    !isLoggedIn || !role ? linksByRole.public : linksByRole[role] ?? linksByRole.public;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to home
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          Farmers Market
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-green-600 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* Cart icon only for customers */}
          {isLoggedIn && role === "customer" && (
            <Link to="/cart" className="relative text-2xl">
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                open
                  ? "M6 18L18 6M6 6l12 12" // close icon
                  : "M4 6h16M4 12h16M4 18h16" // menu icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t shadow-sm">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="py-2 border-b hover:text-green-600 transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart icon for mobile */}
          {isLoggedIn && role === "customer" && (
            <Link
              to="/cart"
              className="relative text-2xl py-2"
              onClick={() => setOpen(false)}
            >
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
