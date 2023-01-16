import { OfferType } from '@/enums/OfferType';

import { IAppUser } from './AppUser';
import { Category } from './Category';
import { OfferImage } from './OfferImage';

export interface ICreateOffer {
  title: string;
  shortDescription: string;
  price: number;
  offerType: OfferType;
  longDescription?: string;
  location?: string;
  categories: Category[];
  offerImages: any[];
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
  createdAt: string;
  updatedAt?: string;
  images?: OfferImage[];
}
