import AppUserService from '@/services/AppUserService';
import AuthenticationService from '@/services/AuthenticationService';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';

import { ProtectedRouteProps } from './types';

function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const location = useLocation();

  if (AuthenticationService.isAppUserLoggedIn()) {
    return allowedRole === undefined ||
      allowedRole === AppUserService.getAppUser().userType ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;
