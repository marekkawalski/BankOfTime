import React from "react";
import { MyToast } from "../models/MyToast";
import RegistrationService from "../services/RegistrationService";

function useRegister(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const handleSubmit = async (values: any) => {
    try {
      const resp = await RegistrationService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
      });
      if (resp.status === 201) {
        setMyToast({
          background: "success",
          message: resp.data,
          title: "Success",
          show: true,
        });
      }
    } catch (e: any) {
      setMyToast({
        background: "danger",
        message:
          e?.message?.response?.data?.toString() ??
          e?.message?.message?.toString(),
        title: "Error",
        show: true,
      });
      console.log(e);
    }
  };
  return handleSubmit;
}

export default useRegister;
