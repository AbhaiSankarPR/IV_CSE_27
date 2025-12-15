import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { pathname } = useLocation();

  const authenticated = !!localStorage.getItem("token");

  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" replace state={{ referrer: pathname }} />;
  }
}
