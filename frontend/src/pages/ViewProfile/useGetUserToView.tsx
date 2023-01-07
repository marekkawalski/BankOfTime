import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import { IAppUser } from '@/models/AppUser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function useGetUserToView() {
  const [userToView, setUserToView] = useState<IAppUser>();
  const params = useParams();
  const services = useServices();
  const toast = useMyToast();
  const { loggedInAppUser } = useGetAppUser();

  useEffect(() => {
    handleGetUser();
  }, [loggedInAppUser, services]);

  const handleGetUser = async () => {
    if (!loggedInAppUser || !services) return;
    try {
      const result = await services.appUserService.getAppUserByEmail(
        params?.email ?? loggedInAppUser.email
      );
      setUserToView(result?.data ?? {});
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, error as string);
    }
  };
  return { userToView };
}

export default useGetUserToView;
