import { OfferType } from '../enums/OfferType';
import { IAppUser } from './AppUser';

export interface ICreateOffer {
  title: string;
  shortDescription: string;
  price: number;
  offerType: OfferType;
}
export interface IOffer extends ICreateOffer {
  readonly id: number;
  longDescription?: string;
  state?: string;
  location?: string;
  seller?: IAppUser;
  buyer?: IAppUser;
}
