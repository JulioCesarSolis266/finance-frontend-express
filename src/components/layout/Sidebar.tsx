import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-amber-500 text-white flex flex-col shadow-xl">
      {/* Logo / Header */}
      <div className="px-6 py-6 border-b border-amber-600">
        <h2 className="text-xl font-semibold tracking-wide">Finance App</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/categories", label: "Categorías" },
          { to: "/transactions", label: "Transacciones" },
          { to: "/reports", label: "Reportes" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-amber-600 shadow-md"
                  : "hover:bg-amber-600 hover:scale-[1.02]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
