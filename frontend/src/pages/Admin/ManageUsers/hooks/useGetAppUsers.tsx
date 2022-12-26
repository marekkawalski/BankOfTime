import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import React, { useEffect, useState } from 'react';

import { AppUserRequestParams, AppUsersData } from '../types';
import { UseGetAppUsersProps } from './types';

function useGetAppUsers({ reload }: UseGetAppUsersProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();
  const [data, setData] = useState<AppUsersData | null>(null);

  useEffect(() => {
    (async () => {
      await handleGetAppUsers({});
    })();
  }, [reload]);

  const handleGetAppUsers = async (
    appUserRequestParams: AppUserRequestParams
  ) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.appUserService.getAllUsers(
        appUserRequestParams
      );
      setLoading(false);
      if (resp.status === 204) {
        toast?.make(ToastTitle.WARNING, ToastBackground.WARNING, "No appUsers");
      }
      setData(resp.data);
    } catch (e: any) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, e as string);
      console.log(e);
    }
  };
  return { loading, handleGetAppUsers, data };
}

export default useGetAppUsers;
