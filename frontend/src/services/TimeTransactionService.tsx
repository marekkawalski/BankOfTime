import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '../config/config';
import { ITimeTransactionService } from './types';

class TimeTransactionService implements ITimeTransactionService {
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
}
export default new TimeTransactionService();
