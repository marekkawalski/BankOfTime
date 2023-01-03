import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { useState } from 'react';

export function useRegister() {
  const services = useServices();
  const toast = useMyToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    try {
      if (!services) return;
      setLoading(true);
      let images = new FormData();
      images.append("profilePhoto", values.profilePhoto);
      images.append("coverPhoto", values.coverPhoto);
      const resp = await services.registrationService.register(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          email: values.email,
          phoneNumber: values.phone,
          city: values.city,
          country: values.country,
          aboutMe: values.aboutMe,
          occupation: values.occupation,
        },
        images.get("profilePhoto"),
        images.get("coverPhoto")
      );
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
    setLoading(false);
  };
  return { handleSubmit, loading };
}
