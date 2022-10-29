import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import { APP_USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../constants/constants";

function LoginLogout() {
  const navigate = useNavigate();
  return AuthenticationService.isAppUserLoggedIn() ? (
    <>
      <div className="px-2">
        Hello, {sessionStorage.getItem(APP_USER_NAME_SESSION_ATTRIBUTE_NAME)}
      </div>
      <Button
        className="px-2"
        onClick={() => {
          AuthenticationService.logout();
          navigate("/");
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <Button
      className="px-2"
      onClick={() => {
        navigate("/");
      }}
    >
      Login
    </Button>
  );
}

export default LoginLogout;
