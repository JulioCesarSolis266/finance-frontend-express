import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/categories", label: "Categorías" },
    { to: "/transactions", label: "Transacciones" },
    { to: "/reports", label: "Reportes" },
  ];

  return (
    <>
      {/* Top bar mobile */}
      <div className="md:hidden flex items-center justify-between bg-amber-500 text-white px-4 py-3 sticky top-0 z-50">
        <h2 className="font-semibold">Finance App</h2>
        <button onClick={() => setOpen(true)} className="text-xl">
          ☰
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer mobile + Sidebar desktop */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-amber-500 text-white z-50
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:static md:flex md:flex-col md:h-screen
        `}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-amber-600 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Finance App</h2>

          {/* Close button mobile */}
          <button onClick={() => setOpen(false)} className="md:hidden text-xl">
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-4 py-6 space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-white text-amber-600" : "hover:bg-amber-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
