import { OfferType } from '@/enums/OfferType';

import { IAppUser } from './AppUser';
import { Category } from './Category';

export interface ICreateOffer {
  title: string;
  shortDescription: string;
  price: number;
  offerType: OfferType;
  longDescription?: string;
  location?: string;
  categories: Category[];
}
export interface IUpdateOffer extends ICreateOffer {
  readonly id: number;
}
export interface IOffer extends ICreateOffer {
  readonly id: number;
  state?: string;
  seller?: IAppUser;
  buyer?: IAppUser;
  previousPrice?: number;
}
