import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';

import AppUserService from '../services/AppUserService';
import AuthenticationService from '../services/AuthenticationService';
import OfferService from '../services/OfferService';
import RegistrationService from '../services/RegistrationService';
import { IAppUserService, IAuthenticationService, IOfferService, IRegistrationService } from '../services/types';
import { ContextProps, ServicesContextProviderProps } from './types';

const ServicesContext = createContext<ContextProps | undefined>(undefined);

export default function ServicesContextProvider({
  children,
}: ServicesContextProviderProps) {
  const [appUserService, setAppUserService] =
    useState<IAppUserService>(AppUserService);
  const [registrationService, setRegistrationService] =
    useState<IRegistrationService>(RegistrationService);
  const [offerService, setOfferService] = useState<IOfferService>(OfferService);
  const [authenticationService, setAuthenticationService] =
    useState<IAuthenticationService>(AuthenticationService);

  useEffect(() => {
    setAppUserService(AppUserService);
    setRegistrationService(RegistrationService);
    setOfferService(OfferService);
    setAuthenticationService(AuthenticationService);
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        appUserService,
        registrationService,
        offerService,
        authenticationService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  return useContext(ServicesContext);
}
