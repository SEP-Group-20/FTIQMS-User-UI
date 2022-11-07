import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import {
  COMPLETELY_NEW,
  PWD_UPDATED,
  SET_FUEL_STATUS,
  SET_LOCATION,
} from "./ManagerStatuses";

import { ADMIN, MANAGER } from "./RolesList";

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  const { user } = useAuth().auth();

  if (!user?.role || !allowedRoles.includes(user.role))
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (user.role === MANAGER && user.status === SET_LOCATION) ||
    (user.role === ADMIN && user.status === PWD_UPDATED) ||
    (location.pathname === "/fuelStationManager/location")||
    (location.pathname ==="/updatePwd") ? (
    children
  ) : user?.status === COMPLETELY_NEW ? (
    <Navigate to="/updatePwd" state={{ from: location.pathname }} replace />
  ) : user.role === MANAGER && user?.status === PWD_UPDATED ? (
    <Navigate to="/setFuelStatus" state={{ from: location.pathname }} replace />
  ) : user.role === MANAGER && user?.status === SET_FUEL_STATUS ? (
    <Navigate
      to="/fuelStationManager/location"
      state={{ from: location.pathname}}
      replace
    />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
