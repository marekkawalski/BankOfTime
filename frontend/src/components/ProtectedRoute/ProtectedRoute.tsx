import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Outlet, Navigate } from "react-router";

function ProtectedRoute() {
  return AuthenticationService.isUserLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;
