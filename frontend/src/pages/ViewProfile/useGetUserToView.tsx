import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAppUser } from '../../models/AppUser';

function useGetUserToView() {
  const [userToView, setUserToView] = useState<IAppUser>();
  const params = useParams();
  const services = useServices();
  const toast = useMyToast();
  const { appUser } = useGetAppUser();

  useEffect(() => {
    handleGetUser();
  }, [appUser, services]);

  const handleGetUser = async () => {
    if (!appUser || !services) return;
    if (!params.email) {
      setUserToView(appUser);
      return { userToView };
    }
    try {
      const result = await services.appUserService.getAppUserByEmail(
        params.email
      );
      setUserToView(result?.data ?? {});
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, error as string);
    }
  };
  return { userToView };
}

export default useGetUserToView;
