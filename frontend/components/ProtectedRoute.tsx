import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";

interface Props {
  children: ReactNode;
  role: UserRole;
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role === "admin" && user.role !== "admin") return <Navigate to="/" replace />;
  if (role === "user" && user.role === "guest") return <Navigate to="/login" replace />;

  return <>{children}</>;
}
