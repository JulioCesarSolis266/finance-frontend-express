import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../shared/api/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/auth/register", {
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      const message = err?.response?.data?.error || "Error al crear la cuenta";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Crear Cuenta</h2>
          <p className="text-sm text-slate-500 mt-1">
            Regístrate para comenzar
          </p>
        </div>

        {/* 🔥 KEY IMPORTANTE */}
        <form
          key="register-form"
          onSubmit={handleSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className="text-center text-sm">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-indigo-600 font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
