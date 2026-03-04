import { useEffect, useState } from "react";
import type { Category } from "../categories/categories.service";
import categoryService from "../categories/categories.service";
import transactionService from "./transaction.service";

interface Props {
  onCreated: () => void;
}

export default function TransactionForm({ onCreated }: Props) {
  const [type, setType] = useState<"INCOME" | "EXPENSE" | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      if (!type) {
        setCategories([]);
        return;
      }

      const data = await categoryService.getAll(type);
      setCategories(data);
    };

    loadCategories();
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await transactionService.create({
      amount: Number(amount),
      date,
      description,
      categoryId,
      type,
    });

    setAmount("");
    setDate("");
    setDescription("");
    setCategoryId("");
    setType("");

    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Nueva Transacción
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Registra un ingreso o gasto
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Tipo */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Tipo</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "INCOME" | "EXPENSE");
              setCategoryId("");
            }}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="">Seleccionar tipo</option>
            <option value="INCOME">Ingreso</option>
            <option value="EXPENSE">Gasto</option>
          </select>
        </div>

        {/* Monto */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Fecha */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Categoría */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={!type}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Descripción
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Crear Transacción
        </button>
      </div>
    </form>
  );
}
