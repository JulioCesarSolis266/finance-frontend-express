import { useState } from "react";
import categoryService from "./categories.service";

interface Props {
  onCreated: () => void;
}

export default function CategoryForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await categoryService.create({
      name,
      type,
    });

    setName("");
    setType("EXPENSE");
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Nueva Categoría
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Crea una categoría para clasificar tus movimientos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Nombre */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Tipo */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="INCOME">Ingreso</option>
            <option value="EXPENSE">Gasto</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Crear Categoría
        </button>
      </div>
    </form>
  );
}
