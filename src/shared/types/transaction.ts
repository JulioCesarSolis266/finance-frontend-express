export interface Transaction {
  id: string;
  amount: string;
  date: string;
  description?: string;
  userId: string;
  type: "income" | "expense";
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
