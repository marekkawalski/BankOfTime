import { API_URL } from '@/config/config';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { TimeTransactionRequestParams } from '../pages/Wallet/hooks/types';
import { ITimeTransactionService } from './types';

class TimeTransactionService implements ITimeTransactionService {
  async requestApproval(
    offerId: number,
    sellerId: number,
    buyerId: number
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(
        `${API_URL}/timeTransactions/offers/${offerId}/seller/${sellerId}/buyer/${buyerId}`
      );
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
  async makeTransaction(
    offerId: number,
    sellerId: number,
    buyerId: number
  ): Promise<AxiosResponse> {
    try {
      return await axios.post(
        `${API_URL}/timeTransactions/offers/${offerId}/seller/${sellerId}/buyer/${buyerId}`
      );
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
  async rejectPendingApproval(offerId: number): Promise<AxiosResponse> {
    try {
      return await axios.put(
        `${API_URL}/timeTransactions/offers/${offerId}/rejectPendingApproval`
      );
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }

  async getAppUsersTimeTransactions(
    timeTransactionRequestParams: TimeTransactionRequestParams,
    appUserId: number
  ): Promise<AxiosResponse> {
    try {
      return await axios.get(
        `${API_URL}/clients/${appUserId}/timeTransactions?${this.getUrlString(
          timeTransactionRequestParams
        )}`
      );
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }

  private getUrlString(
    timeTransactionRequestParams?: TimeTransactionRequestParams
  ): string {
    if (!timeTransactionRequestParams) return "";
    return "".concat(
      timeTransactionRequestParams?.pageNumUrl ?? "",
      timeTransactionRequestParams?.pageSizeUrl ?? "",
      timeTransactionRequestParams?.sortFieldUrl ?? ""
    );
  }
}
export default new TimeTransactionService();
