import React from "react";
import { useNavigate } from "react-router-dom";
import { MyToast } from "../models/MyToast";
import AuthenticationService from "../services/AuthenticationService";

function useLogin(
  username: string,
  password: string,
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const navigate = useNavigate();

  const loginClicked = async () => {
    try {
      const resp =
        await AuthenticationService.executeBasicAuthenticationService(
          username,
          password
        );
      console.log(resp);
      AuthenticationService.registerSuccessfulLogin(username, password);
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
