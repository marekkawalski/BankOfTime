import { IAppUser, IAppUserToRegister } from '../models/AppUser';
import { ICreateOffer } from '../models/Offer';

export interface IAppUserService {
  getAppUserByEmail(email: string): any;
  getAppUser(): IAppUser;
}
export interface IAuthenticationService {
  executeBasicAuthenticationService(email: string, password: string): any;
  createBasicAuthToken(email: string, password: string): string;
  registerSuccessfulLogin(email: string, password: string): void;
  isAppUserLoggedIn(): boolean;
  setupAxiosInterceptors(token: string | null): void;
  logout(): void;
  logoutAndNavigateToLogin(): void;
}
export interface IRegistrationService {
  register(user: IAppUserToRegister): any;
}
export interface IOfferService {
  createOffer(offer: ICreateOffer): any;
  getAppUserSellOffers(appUserId: number): any;
  getAppUserPurchaseOffers(appUserId: number): any;
  getAppUserSellOfferById(appUserId: number, sellOfferId: number): any;
  getAppUserPurchaseOfferById(appUserId: number, purchaseOfferId: number): any;
}
