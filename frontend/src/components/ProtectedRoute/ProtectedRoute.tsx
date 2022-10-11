import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();
  return AuthenticationService.isUserLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
