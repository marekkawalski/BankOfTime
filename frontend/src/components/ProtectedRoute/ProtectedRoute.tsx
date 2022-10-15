import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole?: string;
}
function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const location = useLocation();

  if (AuthenticationService.isUserLoggedIn()) {
    return allowedRole === undefined ||
      allowedRole === AuthenticationService.getUserRole() ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;
