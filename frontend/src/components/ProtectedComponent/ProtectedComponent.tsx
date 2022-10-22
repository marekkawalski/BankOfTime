import React from "react";
import AuthenticationService from "../../services/AuthenticationService";

interface ProtectedComponentProps {
  allowedRole?: string;
  children: React.ReactNode;
}
const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  allowedRole,
  children,
}): JSX.Element => {
  return AuthenticationService.isUserLoggedIn() &&
    (allowedRole === AuthenticationService.getUserRole() ||
      allowedRole === undefined) ? (
    <>{children}</>
  ) : (
    <></>
  );
};
export default ProtectedComponent;
