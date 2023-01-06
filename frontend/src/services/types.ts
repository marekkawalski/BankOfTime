import { IAppUser, IAppUserToUpdate } from '@/models/AppUser';
import { CategoryToCreate } from '@/models/Category';
import { ICreateOffer, IUpdateOffer } from '@/models/Offer';
import { OfferRequestParams } from '@/models/PageRequestParams';
import { AppUserRequestParams } from '@/pages/Admin/ManageUsers/types';
import { TimeTransactionRequestParams } from '@/pages/Wallet/hooks/types';
import { AxiosResponse } from 'axios';

export interface IAppUserService {
  getAppUserByEmail(email: string): Promise<AxiosResponse>;
  getAppUserById(id: number): Promise<AxiosResponse>;
  getAppUser(): IAppUser;
  getAllUsers(
    appUserRequestParams: AppUserRequestParams
  ): Promise<AxiosResponse<any, any>>;
  updateAppUser(appUser: IAppUserToUpdate): Promise<AxiosResponse<any, any>>;
  enableAppUser(email: string): Promise<AxiosResponse<any, any>>;
  disableAppUser(email: string): Promise<AxiosResponse<any, any>>;
  getAppUserAccountBalance(id: number): Promise<AxiosResponse<any, any>>;
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
  register(formData: any): Promise<AxiosResponse>;
}
export interface IOfferService {
  getOfferById(offerId: number): Promise<AxiosResponse>;
  createOffer(offer: ICreateOffer): Promise<AxiosResponse>;
  updateOffer(offer: IUpdateOffer): Promise<AxiosResponse>;
  getOffers(offerRequestParams?: OfferRequestParams): Promise<AxiosResponse>;
  getAppUserOffers(
    id: number,
    offerRequestParams?: OfferRequestParams
  ): Promise<AxiosResponse<any, any>>;
  getAppUserChosenOffers(
    id: number,
    offerRequestParams?: OfferRequestParams
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
  getAppUsersTimeTransactions(
    timeTransactionRequestParams: TimeTransactionRequestParams,
    appUserId: number
  ): Promise<AxiosResponse>;
}

export interface ICategoryService {
  getAllCategories(): Promise<AxiosResponse<any, any>>;
  addCategory(category: CategoryToCreate): Promise<AxiosResponse<any, any>>;
}
