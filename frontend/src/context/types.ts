import {
  IAppUserService,
  IAuthenticationService,
  IOfferService,
  IRegistrationService,
  ITimeTransactionService,
} from '../services/types';

export interface ServicesContextProviderProps {
  children: React.ReactNode;
}
export interface ContextProps {
  appUserService: IAppUserService;
  offerService: IOfferService;
  registrationService: IRegistrationService;
  authenticationService: IAuthenticationService;
  timeTransactionService: ITimeTransactionService;
}
