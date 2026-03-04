import { useEffect, useState, useCallback } from "react";
import { getCurrentMonthRange } from "../utils/dates";
import reportsService from "../services/reports.service";
import Card from "../../../shared/components/ui/Card";
import { formatCurrency } from "@/shared/utils/format";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: { id: string; name: string } | null;
}

interface DateRangeData {
  total: number;
  transactions: Transaction[];
}

export default function DateRangeSection() {
  const { startDate, endDate } = getCurrentMonthRange();

  const [draft, setDraft] = useState({ startDate, endDate });
  const [applied, setApplied] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);

  const [data, setData] = useState<DateRangeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRange = useCallback(
    async (range = draft) => {
      if (!range.startDate || !range.endDate) return;

      try {
        setLoading(true);
        setError(null);
        setApplied(range);

        const response = await reportsService.getByDateRange({
          start: range.startDate,
          end: range.endDate,
        });

        setData({
          total: Number(response.total),
          transactions: response.transactions,
        });
      } catch {
        setError("Error al cargar las transacciones");
      } finally {
        setLoading(false);
      }
    },
    [draft],
  );

  useEffect(() => {
    fetchRange({ startDate, endDate });
  }, []);

  return (
    <Card className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Transacciones por rango
        </h2>
        {applied && (
          <p className="text-sm text-slate-500 mt-1">
            {applied.startDate} → {applied.endDate}
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-end flex-wrap">
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Desde</label>
          <input
            type="date"
            value={draft.startDate}
            onChange={(e) =>
              setDraft((d) => ({ ...d, startDate: e.target.value }))
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-600">Hasta</label>
          <input
            type="date"
            value={draft.endDate}
            min={draft.startDate}
            onChange={(e) =>
              setDraft((d) => ({ ...d, endDate: e.target.value }))
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <button
          onClick={() => fetchRange(draft)}
          disabled={!draft.startDate || !draft.endDate || loading}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
        >
          Aplicar
        </button>
      </div>

      {/* Estados */}
      {loading && <p className="text-sm text-slate-500">Cargando...</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && data && (
        <>
          {/* Total destacado */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <p className="text-sm text-slate-600">Total del período</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${formatCurrency(data.total)}
            </p>
          </div>

          {/* Lista */}
          {data.transactions.length === 0 && (
            <p className="text-sm text-slate-500">
              No hay transacciones en este rango.
            </p>
          )}

          {data.transactions.length > 0 && (
            <div className="space-y-2">
              {data.transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border-b pb-2 text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">
                      {t.category?.name ?? "Sin categoría"}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {t.date.slice(0, 10)}
                    </span>
                  </div>

                  <span
                    className={`font-semibold ${
                      t.type === "INCOME" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "INCOME" ? "+" : "-"}${formatCurrency(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
