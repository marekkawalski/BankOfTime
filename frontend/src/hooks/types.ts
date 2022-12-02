import { OfferStatus } from '../enums/OfferState';
import { OfferType } from '../enums/OfferType';

export interface UseGetAppUserOffersProps {
  offerType?: OfferType;
  offerStatus?: OfferStatus;
}

export interface UseGetOffersProps {
  offerType: OfferType;
  offerStatus?: OfferStatus;
}

export interface UseGetOfferProps {
  reload?: boolean;
  id?: number;
}
