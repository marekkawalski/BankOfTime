import React from "react";
import AppUserService from "../../services/AppUserService";
import AuthenticationService from "../../services/AuthenticationService";
import { ProtectedComponentProps } from "./types";

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  allowedRole,
  children,
}): JSX.Element => {
  return AuthenticationService.isAppUserLoggedIn() &&
    (allowedRole === AppUserService.getAppUser().userType ||
      allowedRole === undefined) ? (
    <>{children}</>
  ) : (
    <></>
  );
};
export default ProtectedComponent;
