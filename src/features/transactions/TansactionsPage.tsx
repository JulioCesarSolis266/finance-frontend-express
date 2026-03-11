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
      {/* Título */}
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

      {/* Tabla */}
      <Card>
        {transactions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No hay transacciones registradas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Descripción
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Monto
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">Tipo</th>
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
        )}
      </Card>
    </div>
  );
}
