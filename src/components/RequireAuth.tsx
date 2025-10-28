// src/components/RequireAuth.tsx

import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./../utils/storage";

interface Props {
  children: JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
