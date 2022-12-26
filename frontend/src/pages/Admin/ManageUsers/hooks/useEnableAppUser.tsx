import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { useState } from 'react';

function useEnableAppUser({ reload, setReload }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  const handleEnableAppUser = async (email: any) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.appUserService.enableAppUser(
        email.target.value
      );
      setLoading(false);
      if (resp.status === 200) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "User has been enabled"
        );
      } else if (resp.status === 404) {
        toast?.make(
          ToastTitle.ERROR,
          ToastBackground.ERROR,
          "User was not found!"
        );
      }
      setReload(!reload);
    } catch (e: any) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, e as string);
      console.log(e);
    }
  };
  return { loading, handleEnableAppUser };
}

export default useEnableAppUser;
