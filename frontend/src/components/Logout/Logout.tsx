import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import { Button } from "../Button/Button";

function LogoutComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    AuthenticationService.logout();
  }, []);
  return (
    <div>
      You have been logged out !!
      <Button onClick={() => navigate("/")}>Login</Button>
    </div>
  );
}

export default LogoutComponent;
