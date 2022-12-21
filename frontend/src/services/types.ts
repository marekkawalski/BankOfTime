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
  updateOffer(offer: IOffer): Promise<AxiosResponse>;
  getOffers(offerRequestParams: OfferRequestParams): Promise<AxiosResponse>;
  getAppUserOffers(
    offerRequestParams: OfferRequestParams,
    id: number
  ): Promise<AxiosResponse<any, any>>;
  getAppUserChosenOffers(
    offerRequestParams: OfferRequestParams,
    id: number
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
  rejectPendingApproval(offerId: number): Promise<AxiosResponse>;
}

export interface ICategoryService {
  getAllCategories(): Promise<AxiosResponse<any, any>>;
}
export interface OfferRequestParams {
  offerTypeUrl?: string;
  offerStatusUrl?: string;
  sortFieldUrl?: string;
  sortDirectionUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
  keywordUrl?: string;
  categoryUrl?: string;
}
