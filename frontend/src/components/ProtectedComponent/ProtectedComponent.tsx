import React from "react";
import AuthenticationService from "../../services/AuthenticationService";

interface ProtectedComponentProps {
  allowedRole: string;
  children: React.ReactNode;
}
const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  allowedRole,
  children,
}): JSX.Element => {
  return allowedRole === AuthenticationService.getUserRole() ? (
    <>{children}</>
  ) : (
    <></>
  );
};
export default ProtectedComponent;
