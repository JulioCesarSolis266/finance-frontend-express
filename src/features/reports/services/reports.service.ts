import api from "../../../shared/api/axios";

const getBalance = async (filters: { from?: string; to?: string }) => {
  const { data } = await api.get("/reports/balance", { params: filters });
  return data;
};

const getMonthlySummary = async (filters: { type?: string }) => {
  const { data } = await api.get("/reports/monthly", { params: filters });
  return data;
};

// ✅ Sin type — la categoría ya implica el tipo
const getSummaryByCategory = async (filters: { month: string }) => {
  const { data } = await api.get("/reports/by-category", { params: filters });
  return data;
};

// ✅ start/end — nombres que espera el backend
const getByDateRange = async (filters: { start: string; end: string }) => {
  const { data } = await api.get("/reports/range", { params: filters });
  return data;
};

export default {
  getBalance,
  getMonthlySummary,
  getSummaryByCategory,
  getByDateRange,
};
