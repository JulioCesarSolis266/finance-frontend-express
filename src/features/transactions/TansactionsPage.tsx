import { useEffect, useState } from "react";
import transactionService from "./transaction.service";
import type { Transaction } from "./transactions.types";
import TransactionForm from "./TransactionForm";
import Card from "../../shared/components/ui/Card";
import { formatCurrency } from "@/shared/utils/format";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await transactionService.remove(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const reload = async () => {
    const data = await transactionService.getAll();
    setTransactions(data);
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Cargando transacciones...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Transacciones</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gestión de ingresos y gastos
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <TransactionForm onCreated={reload} />
      </Card>
      <h2 className="text-2xl font-semibold text-slate-900 pt-7">
        Historial de transacciones
      </h2>
      {/* Lista */}
      <Card>
        {transactions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No hay transacciones registradas.
          </p>
        ) : (
          <>
            {/* MOBILE → Cards */}
            <div className="space-y-3 sm:hidden">
              {transactions.map((t) => {
                const isIncome = t.type === "INCOME";

                return (
                  <div
                    key={t.id}
                    className="border rounded-lg p-4 bg-white shadow-sm space-y-2"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-medium text-slate-900 leading-tight">
                        {t.description}
                      </p>

                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                          isIncome
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isIncome ? "Ingreso" : "Gasto"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500">
                      {t.category?.name || "Sin categoría"}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(t.amount)}
                      </p>

                      <p className="text-xs text-slate-500">
                        {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>
            {/* DESKTOP → Tabla */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Descripción
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Categoría
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Monto
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Tipo
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Fecha
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-600">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {transactions.map((t) => {
                    const isIncome = t.type === "INCOME";

                    return (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-slate-900">
                          {t.description}
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {t.category?.name || "Sin categoría"}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {formatCurrency(t.amount)}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isIncome
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isIncome ? "Ingreso" : "Gasto"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {new Date(t.date).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
