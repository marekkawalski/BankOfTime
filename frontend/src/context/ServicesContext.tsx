import AppUserImageService from '@/services/AppUserImageService';
import AppUserService from '@/services/AppUserService';
import AuthenticationService from '@/services/AuthenticationService';
import CategoryService from '@/services/CategoryService';
import OfferService from '@/services/OfferService';
import RegistrationService from '@/services/RegistrationService';
import TimeTransactionService from '@/services/TimeTransactionService';
import {
  IAppUserService,
  IAuthenticationService,
  IOfferService,
  IRegistrationService,
  ITimeTransactionService,
} from '@/services/types';
import { createContext, useContext, useEffect, useState } from 'react';

import { IAppUserImageService, ICategoryService } from '../services/types';
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
  const [timeTransactionService, setTimeTransactionService] =
    useState<ITimeTransactionService>(TimeTransactionService);
  const [categoryService, setCategoryService] =
    useState<ICategoryService>(CategoryService);
  const [appUserImageService, setAppUserImageService] =
    useState<IAppUserImageService>(AppUserImageService);

  useEffect(() => {
    setAppUserService(AppUserService);
    setRegistrationService(RegistrationService);
    setOfferService(OfferService);
    setAuthenticationService(AuthenticationService);
    setTimeTransactionService(TimeTransactionService);
    setCategoryService(CategoryService);
    setAppUserImageService(AppUserImageService);
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        appUserService,
        registrationService,
        offerService,
        authenticationService,
        timeTransactionService,
        categoryService,
        appUserImageService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  return useContext(ServicesContext);
}
