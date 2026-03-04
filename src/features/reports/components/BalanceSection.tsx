import { useCallback, useEffect, useState } from "react";
import { getCurrentMonthRange } from "../utils/dates";
import reportsService from "../services/reports.service";
import Card from "../../../shared/components/ui/Card";
import { formatCurrency } from "@/shared/utils/format";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface BalanceData {
  income: number;
  expense: number;
  balance: number;
}

const COLORS = ["#16a34a", "#dc2626"]; // verde / rojo

export default function BalanceSection() {
  const { startDate, endDate } = getCurrentMonthRange();

  const [draft, setDraft] = useState<DateRange>({ startDate, endDate });
  const [applied, setApplied] = useState<DateRange | null>(null);
  const [data, setData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async (range: DateRange) => {
    try {
      setLoading(true);
      setError(null);
      setApplied(range);

      const response = await reportsService.getBalance({
        from: range.startDate,
        to: range.endDate,
      });

      setData({
        income: Number(response.income),
        expense: Number(response.expense),
        balance: Number(response.balance),
      });
    } catch {
      setError("Error al cargar el balance");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance({ startDate, endDate });
  }, []);

  const chartData =
    data && data.income + data.expense > 0
      ? [
          { name: "Ingresos", value: data.income },
          { name: "Gastos", value: data.expense },
        ]
      : [];

  return (
    <Card className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Balance general
        </h2>
        {applied && (
          <p className="text-sm text-slate-500 mt-1">
            {applied.startDate} → {applied.endDate}
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end">
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
          onClick={() => fetchBalance(draft)}
          disabled={!draft.startDate || !draft.endDate || loading}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
        >
          Aplicar
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Cargando datos...</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && data && (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Resumen numérico */}
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600">Ingresos</span>
              <span className="font-medium text-green-600">
                ${formatCurrency(data.income)}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-600">Gastos</span>
              <span className="font-medium text-red-600">
                ${formatCurrency(data.expense)}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="font-semibold text-slate-900">Balance</span>
              <span
                className={`font-bold ${
                  data.balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(data.balance)}
              </span>
            </div>
          </div>

          {/* Gráfico */}
          {chartData.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
