import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { IAppUser, IAppUserToRegister } from '@/models/AppUser';
import { ICreateOffer, IOffer } from '@/models/Offer';
import { AxiosResponse } from 'axios';

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
  isAppUserLoggedIn(): boolean;
  logout(): void;
}
export interface IRegistrationService {
  register(user: IAppUserToRegister): Promise<AxiosResponse>;
}
export interface IOfferService {
  getOfferById(offerId: number): Promise<AxiosResponse>;
  createOffer(offer: ICreateOffer): Promise<AxiosResponse>;
  getAllSellOffersAssignedToAppUser(appUserId: number): Promise<AxiosResponse>;
  getAllPurchaseOffersAssignedToAppUser(
    appUserId: number
  ): Promise<AxiosResponse>;
  findAllOffersOfTypeOwnedByAppUser(
    appUserId: number,
    offerType: OfferType
  ): Promise<AxiosResponse>;
  findAllOffersChosenByAppUser(appUserId: number): Promise<AxiosResponse>;
  findAllOffersOwnedByAppUser(appUserId: number): Promise<AxiosResponse>;
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
  requestApproval(
    offerId: number,
    sellerId: number,
    buyerId: number
  ): Promise<AxiosResponse>;
}
