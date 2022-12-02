import { useServices } from '@/context/ServicesContext';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginLogout() {
  const navigate = useNavigate();
  const services = useServices();
  return services?.authenticationService.isAppUserLoggedIn() ? (
    <>
      <div className="px-2">
        Hello, {services?.appUserService.getAppUser().firstName}{" "}
        {services?.appUserService.getAppUser().lastName}
      </div>
      <Button
        className="px-2"
        onClick={() => {
          services?.authenticationService.logout();
          navigate("/");
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <div className="px-2">Hello, Guest</div>
      <Button
        className="px-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Login
      </Button>
    </>
  );
}

export default LoginLogout;
