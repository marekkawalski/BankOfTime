import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import { UseLoginProps } from "./types";

function useLogin({ email, password, setMyToast }: UseLoginProps) {
  const navigate = useNavigate();

  const loginClicked = async () => {
    try {
      const resp =
        await AuthenticationService.executeBasicAuthenticationService(
          email,
          password
        );
      console.log(resp);
      AuthenticationService.registerSuccessfulLogin(email, password);
      navigate("/");
    } catch (e: any) {
      console.log(e);
      setMyToast({
        background: "danger",
        message: e.message,
        title: "Error",
        show: true,
      });
    }
  };
  return loginClicked;
}

export default useLogin;
