import { useState } from "react";
import api from "../../shared/api/axios";
import type { LoginDTO, User } from "./types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: LoginDTO) => {
    const response = await api.post("/auth/login", data);

    const { token } = response.data;

    localStorage.setItem("token", token);
    setUser({ id: "temp-id", email: data.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
