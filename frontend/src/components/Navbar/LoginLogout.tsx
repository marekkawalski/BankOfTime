import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../config/config";
import AuthenticationService from "../../services/AuthenticationService";

function LoginLogout() {
  const navigate = useNavigate();
  return AuthenticationService.isUserLoggedIn() ? (
    <>
      <div className="px-2">
        Hello, {sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}
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
