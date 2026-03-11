export type TransactionType = "INCOME" | "EXPENSE";

import type { Category } from "../categories/categories.types";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  category?: Category | null;
}
