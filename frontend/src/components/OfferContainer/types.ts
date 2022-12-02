import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import { IOffer } from '../../models/Offer';

export interface OfferContainerProps {
  title: string;
  getOffers: {
    loading: boolean;
    offers: IOffer[];
    handleGetOffers: () => Promise<void>;
  };
}

export interface GetOffersProps {
  offerType?: OfferType;
  offerStatus?: OfferStatus;
}
export interface OfferProps {
  offer: IOffer;
  handleGetOffers: () => Promise<void>;
}
