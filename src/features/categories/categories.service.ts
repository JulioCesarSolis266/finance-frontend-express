import api from "../../shared/api/axios";

export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
}

const getAll = async (type?: string): Promise<Category[]> => {
  const { data } = await api.get("/categories", { params: { type } });
  return data.categories;
};

const create = async (payload: { name: string; type: string }) => {
  const { data } = await api.post("/categories", payload);
  return data.category;
};

const remove = async (id: string) => {
  await api.delete(`/categories/${id}`);
};

export default {
  getAll,
  create,
  remove,
};
