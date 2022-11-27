import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '../config/config';
import { OfferStatus } from '../enums/OfferState';
import { OfferType } from '../enums/OfferType';
import { ICreateOffer, IOffer } from '../models/Offer';
import AppUserService from './AppUserService';
import { IOfferService } from './types';

class OfferService implements IOfferService {
  async findAllOffersChosenByAppUser(
    appUserId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/appUserChosenOffers`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async findAllOffersOwnedByAppUser(
    appUserId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/${appUserId}/appUserOffers`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async findAllOffersOfTypeOwnedByAppUser(
    appUserId: number,
    offerType: OfferType
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/offers/type/${offerType}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAllOffers(offerType: OfferType): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/offers/type/${offerType}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAllOffersByTypeAndStatus(
    offerType: OfferType,
    offerStatus: OfferStatus
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/offers/type/${offerType}?offerStatus=${offerStatus}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getOfferById(offerId: number): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/offers/${offerId}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async createOffer(offer: ICreateOffer): Promise<AxiosResponse<any, any>> {
    try {
      const appUserId = AppUserService.getAppUser().id;
      return await axios.post(`${API_URL}/offers/${appUserId}`, offer);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAllSellOffersAssignedToAppUser(
    appUserId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/${appUserId}/sellOffers`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAllPurchaseOffersAssignedToAppUser(
    appUserId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/${appUserId}/purchaseOffers`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserSellOfferById(
    appUserId: number,
    sellOfferId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/sellOffers/${sellOfferId}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserPurchaseOfferById(
    appUserId: number,
    purchaseOfferId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/purchaseOffers/${purchaseOfferId}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async updateOffer(offer: IOffer): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(`${API_URL}/offers`, offer);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
}

export default new OfferService();
