import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useUpdateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      if (!services) return;
      setLoading(true);
      const resp = await services.appUserService.updateAppUser({
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
        phoneNumber: values.phone,
        city: values.city,
        country: values.country,
        aboutMe: values.aboutMe,
        occupation: values.occupation,
        userRole: values.userRole,
      });
      if (resp.status === 200) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "User has been updated!"
        );
      }
    } catch (e: any) {
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        "Error while updating user"
      );
      console.log(e);
    }
    setLoading(false);
    if (values.password) {
      services?.authenticationService.logout();
      navigate("/login");
      window.location.reload();
    }
  };
  return { handleSubmit, loading };
}
