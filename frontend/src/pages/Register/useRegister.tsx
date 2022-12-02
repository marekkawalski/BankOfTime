import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import React from 'react';

function useRegister() {
  const services = useServices();
  const toast = useMyToast();

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
        toast?.make(ToastTitle.SUCCESS, ToastBackground.SUCCESS, resp.data);
      }
    } catch (e: any) {
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        e?.message?.response?.data?.toString() ??
          e?.message?.message?.toString()
      );
      console.log(e);
    }
  };
  return handleSubmit;
}

export default useRegister;
