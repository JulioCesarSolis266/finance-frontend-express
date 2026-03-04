import { createContext, useContext } from "react";
import type { User, LoginDTO } from "./types";

export interface AuthContextType {
  user: User | null;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
