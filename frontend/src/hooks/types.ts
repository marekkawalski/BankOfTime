import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { IOffer } from '@/models/Offer';
import { OfferRequestParams } from '@/services/types';

export interface UseGetAppUserOffersProps {
  offerType?: OfferType;
  offerStatus?: OfferStatus;
}

export interface UseGetOfferProps {
  reload?: boolean;
  id?: number;
}

export interface OffersData {
  content: IOffer[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}
export interface UseGetOffersProps {
  defaultOfferRequestParams: OfferRequestParams;
}
