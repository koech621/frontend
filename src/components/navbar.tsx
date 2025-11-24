import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Get user info from Redux
  const { role, isLoggedIn } = useSelector((state: RootState) => state.auth);

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
      { name: "Dashboard", path: "/farmers" },
      { name: "Products", path: "/products" },
      { name: "Orders", path: "/orders" },
      { name: "Logistics", path: "/logistics" },
      { name: "Payments", path: "/payments" },
    ],
  };

  // Determine which links to show
  const links: NavLink[] =
    !isLoggedIn || !role ? linksByRole.public : linksByRole[role] ?? linksByRole.public;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          Farmers Market
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-green-600 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
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
        </div>
      )}
    </nav>
  );
}
