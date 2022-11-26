import { AxiosResponse } from 'axios';

import { OfferStatus } from '../enums/OfferState';
import { OfferType } from '../enums/OfferType';
import { IAppUser, IAppUserToRegister } from '../models/AppUser';
import { ICreateOffer, IOffer } from '../models/Offer';

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
  registerSuccessfulLogin(): void;
  isAppUserLoggedIn(): boolean;
  setupAxiosInterceptors(token: string | null): void;
  logout(): void;
}
export interface IRegistrationService {
  register(user: IAppUserToRegister): Promise<AxiosResponse>;
}
export interface IOfferService {
  getOfferById(offerId: number): Promise<AxiosResponse>;
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
  updateOffer(offer: IOffer): Promise<AxiosResponse>;
  getAllOffers(offerType: OfferType): Promise<AxiosResponse>;
  getAllOffersByTypeAndStatus(
    offerType: OfferType,
    offerStatus: OfferStatus
  ): Promise<AxiosResponse<any, any>>;
}

export interface ITimeTransactionService {
  makeTransaction(
    offerId: number,
    sellerId: number,
    buyerId: number
  ): Promise<AxiosResponse>;
}
