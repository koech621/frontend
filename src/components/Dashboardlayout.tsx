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

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface Props {
  children: React.ReactNode;
  title?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { to: "/farmer/dashboard", icon: <FaTachometerAlt className="text-green-700" />, label: "Dashboard" },
  { to: "/farmer/products", icon: <FaBox className="text-green-700" />, label: "My Products" },
  { to: "/farmer/orders", icon: <FaShoppingCart className="text-green-700" />, label: "Orders" },
  { to: "/farmer/new", icon: <FaPlus className="text-green-700" />, label: "Add Product" },
  { to: "/farmer/logistics", icon: <FaTruck className="text-green-700" />, label: "Logistics" },
];

export default function DashboardLayout({ children, title = "Farmer Panel", navItems = defaultNavItems }: Props) {
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
              <h1 className="text-lg font-bold text-green-700">{title}</h1>
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
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => active(isActive)}>
              {item.icon}
              {open && <span>{item.label}</span>}
            </NavLink>
          ))}
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
