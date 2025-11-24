import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  children: JSX.Element;
}

export default function ProtectedRoute({ isAllowed, children }: ProtectedRouteProps) {
  if (!isAllowed) return <Navigate to="/" replace />;
  return children;
}
