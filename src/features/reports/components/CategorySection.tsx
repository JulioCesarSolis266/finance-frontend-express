import { useCallback, useEffect, useState } from "react";
import { getCurrentMonthRange } from "../utils/dates";
import reportsService from "../services/reports.service";
import Card from "../../../shared/components/ui/Card";
import { formatCurrency, formatCompactNumber } from "@/shared/utils/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CategorySummaryItem {
  categoryId: string;
  categoryName: string;
  total: number;
}

export default function CategorySection() {
  const { month: currentMonth } = getCurrentMonthRange();

  const [draftMonth, setDraftMonth] = useState(currentMonth);
  const [appliedMonth, setAppliedMonth] = useState<string | null>(null);
  const [data, setData] = useState<CategorySummaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async (month: string) => {
    try {
      setLoading(true);
      setError(null);
      setAppliedMonth(month);

      const response = await reportsService.getSummaryByCategory({ month });

      const normalized = response.map((item: any) => ({
        categoryId: item.category.id,
        categoryName: item.category.name,
        total: Number(item.total),
      }));

      setData(normalized);
    } catch {
      setError("Error al cargar el resumen por categoría");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategory(currentMonth);
  }, []);

  return (
    <Card className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Resumen por categoría
        </h2>
        {appliedMonth && (
          <p className="text-sm text-slate-500 mt-1">Mes: {appliedMonth}</p>
        )}
      </div>

      {/* Filtro */}
      <div className="flex gap-4 items-end flex-wrap">
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Mes</label>
          <input
            type="month"
            value={draftMonth}
            onChange={(e) => setDraftMonth(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <button
          onClick={() => fetchCategory(draftMonth)}
          disabled={!draftMonth || loading}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
        >
          Aplicar
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Cargando datos...</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && data.length === 0 && appliedMonth && (
        <p className="text-sm text-slate-500">No hay datos para este mes.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoryName" />
              <YAxis
                tickFormatter={(value: number) => formatCompactNumber(value)}
              />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
