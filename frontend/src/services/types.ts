import { AxiosResponse } from 'axios';

import { IAppUser, IAppUserToRegister } from '../models/AppUser';
import { ICreateOffer } from '../models/Offer';

export interface IAppUserService {
  getAppUserByEmail(email: string): Promise<AxiosResponse>;
  getAppUser(): IAppUser;
}
export interface IAuthenticationService {
  executeBasicAuthenticationService(
    email: string,
    password: string
  ): Promise<AxiosResponse>;
  createBasicAuthToken(email: string, password: string): string;
  registerSuccessfulLogin(email: string, password: string): void;
  isAppUserLoggedIn(): boolean;
  setupAxiosInterceptors(token: string | null): void;
  logout(): void;
  logoutAndNavigateToLogin(): void;
}
export interface IRegistrationService {
  register(user: IAppUserToRegister): Promise<AxiosResponse>;
}
export interface IOfferService {
  createOffer(offer: ICreateOffer): Promise<AxiosResponse>;
  getAppUserSellOffers(appUserId: number): Promise<AxiosResponse>;
  getAppUserPurchaseOffers(appUserId: number): Promise<AxiosResponse>;
  getAppUserSellOfferById(
    appUserId: number,
    sellOfferId: number
  ): Promise<AxiosResponse>;
  getAppUserPurchaseOfferById(
    appUserId: number,
    purchaseOfferId: number
  ): Promise<AxiosResponse>;
}
