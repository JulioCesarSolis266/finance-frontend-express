import { useAuth } from "../../features/auth/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Título o breadcrumb futuro */}
      <div>
        <h1 className="text-sm font-medium text-slate-600">Panel</h1>
      </div>

      {/* Acción */}
      <button
        onClick={logout}
        className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
