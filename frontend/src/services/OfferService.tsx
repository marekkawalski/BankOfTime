import axios, { AxiosError } from 'axios';

import { API_URL } from '../config/config';
import { AUTHENTICATION_TOKEN } from '../constants/constants';
import { ICreateOffer } from '../models/Offer';
import AppUserService from './AppUserService';
import { IOfferService } from './types';

class OfferService implements IOfferService {
  async createOffer(offer: ICreateOffer) {
    try {
      const appUserId = AppUserService.getAppUser().id;
      return await axios.post(`${API_URL}/offers/${appUserId}`, offer, {
        headers: {
          authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
        },
      });
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAppUserSellOffers(appUserId: number) {
    try {
      return await axios.get(`${API_URL}/clients/${appUserId}/sellOffers`, {
        headers: {
          authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
        },
      });
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAppUserPurchaseOffers(appUserId: number) {
    try {
      return await axios.get(`${API_URL}/clients/${appUserId}/purchaseOffers`, {
        headers: {
          authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
        },
      });
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserSellOfferById(appUserId: number, sellOfferId: number) {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/sellOffers/${sellOfferId}`,
        {
          headers: {
            authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
          },
        }
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserPurchaseOfferById(
    appUserId: number,
    purchaseOfferId: number
  ) {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/purchaseOffers/${purchaseOfferId}`,
        {
          headers: {
            authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
          },
        }
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
}

export default new OfferService();
