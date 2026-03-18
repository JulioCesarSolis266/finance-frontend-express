import { useCallback, useEffect, useState } from "react";
import reportsService from "../services/reports.service";
import Card from "../../../shared/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface MonthlyItem {
  month: string;
  total: number;
}

export default function MonthlySection() {
  const [type, setType] = useState<"" | "INCOME" | "EXPENSE">("");
  const [data, setData] = useState<MonthlyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthly = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await reportsService.getMonthlySummary({
        type: type || undefined,
      });

      const normalized = response.map((item: any) => ({
        month: item.month,
        total: Number(item.total),
      }));
      setData(normalized);
    } catch {
      setError("Error al cargar el resumen mensual");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchMonthly();
  }, [fetchMonthly]);

  return (
    <Card className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Evolución mensual
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tendencia de ingresos y gastos
        </p>
      </div>

      {/* Filtro por tipo */}
      <div className="flex gap-4 items-end">
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Tipo</label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "" | "INCOME" | "EXPENSE")
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Todos</option>
            <option value="INCOME">Ingresos</option>
            <option value="EXPENSE">Gastos</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Cargando datos...</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-sm text-slate-500">No hay datos disponibles.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Total"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
