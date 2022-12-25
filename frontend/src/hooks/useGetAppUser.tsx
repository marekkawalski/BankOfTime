import { useServices } from '@/context/ServicesContext';
import { IAppUser } from '@/models/AppUser';
import React, { useEffect, useState } from 'react';

function useGetAppUser() {
  const [loggedInAppUser, setLoggedInAppUser] = useState<
    IAppUser | undefined
  >();
  const services = useServices();

  useEffect(() => {
    if (!services) return;
    setLoggedInAppUser(services.appUserService.getAppUser());
  }, [setLoggedInAppUser, services]);
  return { loggedInAppUser };
}

export default useGetAppUser;
