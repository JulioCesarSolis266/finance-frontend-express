import { useEffect, useState } from "react";
import SummaryCard from "./components/SummaryCard";
import api from "../../shared/api/axios";

interface BalanceResponse {
  balance: number;
  income: number;
  expense: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<BalanceResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<BalanceResponse>("/reports/balance");

      setData({
        balance: Number(response.data.balance),
        income: Number(response.data.income),
        expense: Number(response.data.expense),
      });
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="p-6">
        <div className="text-sm text-slate-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Resumen financiero general
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Balance Total" value={data.balance} />
        <SummaryCard title="Ingresos del Mes" value={data.income} />
        <SummaryCard title="Gastos del Mes" value={data.expense} />
      </div>
    </div>
  );
}
