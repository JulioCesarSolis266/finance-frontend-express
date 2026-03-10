// This component is a protected route that checks if the user is authenticated. If the user is not authenticated, it redirects them to the login page. If the user is authenticated, it renders the child components.

import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
