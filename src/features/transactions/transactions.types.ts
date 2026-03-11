export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
}
