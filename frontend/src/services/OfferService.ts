import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL, AUTHENTICATION_TOKEN } from "../config/config";
import { Offer } from "../models/Offer";

class OfferService {
  async createOffer(offer: Offer) {
    try {
      const resp: AxiosResponse = await axios.post(`${API_URL}/offers`, offer, {
        headers: {
          authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
        },
      });

      return resp;
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
}

export default new OfferService();
