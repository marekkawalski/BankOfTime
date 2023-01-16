import { API_URL } from '@/config/config';
import { OfferRequestParams } from '@/models/PageRequestParams';
import axios, { AxiosError, AxiosResponse } from 'axios';

import AppUserService from './AppUserService';
import { IOfferService } from './types';

class OfferService implements IOfferService {
  async createOffer(formData: any): Promise<AxiosResponse<any, any>> {
    try {
      const appUserId = AppUserService.getAppUser().id;
      return await axios.post(
        `${API_URL}/offers/?clientId=${appUserId}`,
        formData
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
  async getOffers(
    offerRequestParams?: OfferRequestParams
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/offers?${this.getUrlString(offerRequestParams)}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAppUserOffers(
    id: number,
    offerRequestParams?: OfferRequestParams
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${id}/appUserOffers?${this.getUrlString(
          offerRequestParams
        )}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAppUserChosenOffers(
    id: number,
    offerRequestParams?: OfferRequestParams
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients/${id}/appUserChosenOffers?${this.getUrlString(
          offerRequestParams
        )}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async updateOffer(formData: any): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(`${API_URL}/offers`, formData);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  private getUrlString(offerRequestParams?: OfferRequestParams): string {
    if (!offerRequestParams) return "";
    return "".concat(
      offerRequestParams?.offerTypeUrl ?? "",
      offerRequestParams?.offerStatusUrl ?? "",
      offerRequestParams?.pageNumUrl ?? "",
      offerRequestParams?.pageSizeUrl ?? "",
      offerRequestParams?.sortDirectionUrl ?? "",
      offerRequestParams?.sortFieldUrl ?? "",
      offerRequestParams?.keywordUrl ?? "",
      offerRequestParams?.categoryUrl ?? ""
    );
  }
}

export default new OfferService();
