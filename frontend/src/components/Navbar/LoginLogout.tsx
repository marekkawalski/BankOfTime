import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import AppUserService from '../../services/AppUserService';
import AuthenticationService from '../../services/AuthenticationService';

function LoginLogout() {
  const navigate = useNavigate();
  return AuthenticationService.isAppUserLoggedIn() ? (
    <>
      <div className="px-2">
        Hello, {AppUserService.getAppUser().firstName}{" "}
        {AppUserService.getAppUser().lastName}
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
