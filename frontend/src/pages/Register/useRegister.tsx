import React from 'react';

import { useServices } from '../../context/ServicesContext';
import { MyToast } from '../../models/MyToast';

function useRegister(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const services = useServices();
  const handleSubmit = async (values: any) => {
    try {
      if (!services) return;
      const resp = await services.registrationService.register({
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
