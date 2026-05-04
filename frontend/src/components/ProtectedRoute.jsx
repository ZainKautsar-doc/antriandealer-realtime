import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";

export default function ProtectedRoute({ children, roles }) {
  const currentUser = useAuthStore(selectCurrentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return (
      <Navigate
        to={currentUser.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  if (
    currentUser.role === "user" &&
    !currentUser.profileComplete &&
    location.pathname !== "/profile"
  ) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
