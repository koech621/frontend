import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBox,
  FaShoppingCart,
  FaPlus,
  FaTruck,
  FaTachometerAlt,
} from "react-icons/fa";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(true);

  // helper for link classes (active)
  const linkBase = "flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors";
  const active = (isActive: boolean) =>
    `${linkBase} ${isActive ? "bg-green-50 border-l-4 border-green-600" : ""}`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed z-40 top-0 left-0 h-full transition-all duration-300
          ${open ? "w-64" : "w-16"}
        `}
        aria-hidden={false}
      >
        <div className="p-4 border-b flex justify-between items-center">
          {open ? (
            <div className="flex items-center gap-2">
              <FaTachometerAlt className="text-green-700" />
              <h1 className="text-lg font-bold text-green-700">Farmer Panel</h1>
            </div>
          ) : (
            <FaTachometerAlt className="text-green-700 mx-auto" />
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            className="p-1 rounded hover:bg-gray-100"
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        <nav className="mt-4 flex flex-col">
          <NavLink to="/farmer/dashboard" className={({ isActive }) => active(isActive)}>
            <FaTachometerAlt className="text-green-700" />
            {open && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/farmer/products" className={({ isActive }) => active(isActive)}>
            <FaBox className="text-green-700" />
            {open && <span>My Products</span>}
          </NavLink>

          <NavLink to="/farmer/orders" className={({ isActive }) => active(isActive)}>
            <FaShoppingCart className="text-green-700" />
            {open && <span>Orders</span>}
          </NavLink>

          <NavLink to="/farmer/new" className={({ isActive }) => active(isActive)}>
            <FaPlus className="text-green-700" />
            {open && <span>Add Product</span>}
          </NavLink>

          <NavLink to="/farmer/logistics" className={({ isActive }) => active(isActive)}>
            <FaTruck className="text-green-700" />
            {open && <span>Logistics</span>}
          </NavLink>
        </nav>
      </aside>

      {/* Main content area */}
      <main
        className={`flex-1 transition-all duration-300 min-h-screen p-6 ${
          open ? "md:ml-64 ml-16" : "md:ml-16 ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
