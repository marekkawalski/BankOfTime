import { MyToast } from '../models/MyToast';
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

export interface ToastContextProviderProps {
  children: React.ReactNode;
}
export interface ToastContextProps {
  get: MyToast;
  set: React.Dispatch<React.SetStateAction<MyToast>>;
  make: (title: string, background: string, message: string) => void;
}
