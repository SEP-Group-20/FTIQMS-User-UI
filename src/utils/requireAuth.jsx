import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  const { user } = useAuth().auth();

  return user != null ? (
    children
  ) : (
    <Navigate to="/unauthorized" state={{ from: location.pathname }}  replace />
  );
};

export default RequireAuth;