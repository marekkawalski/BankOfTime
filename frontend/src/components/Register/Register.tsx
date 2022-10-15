import React, { useEffect } from "react";
import AuthenticationService from "../../services/AuthenticationService";
import RegistrationService from "../../services/RegistrationService";
import { Button } from "../Button/Button";

function Register() {
  useEffect(() => {
    AuthenticationService.logout();
    RegistrationService.register({
      username: "du@gmail.com",
      name: "sdf",
      password: "dfs",
      lastName: "dfs",
    });
  }, []);
  return <div>Register</div>;
}

export default Register;
