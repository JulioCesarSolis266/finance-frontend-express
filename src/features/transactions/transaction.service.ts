import api from "../../shared/api/axios"; // tu instancia axios
import type { Transaction } from "./transactions.types";

const getAll = async (): Promise<Transaction[]> => {
  const { data } = await api.get("/transactions");
  console.log(data);
  return data.transactions;
};

const create = async (payload: {
  amount: number;
  date: string;
  description?: string;
  categoryId: string;
}) => {
  const { data } = await api.post("/transactions", payload);
  return data;
};

const remove = async (id: string) => {
  await api.delete(`/transactions/${id}`);
};

export default {
  getAll,
  create,
  remove,
};
