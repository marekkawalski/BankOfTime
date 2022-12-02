import { useServices } from '@/context/ServicesContext';
import { IAppUser } from '@/models/AppUser';
import React, { useEffect, useState } from 'react';

function useGetAppUser() {
  const [appUser, setAppUser] = useState<IAppUser | undefined>();
  const services = useServices();
  useEffect(() => {
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [setAppUser, services]);
  return { appUser };
}

export default useGetAppUser;
