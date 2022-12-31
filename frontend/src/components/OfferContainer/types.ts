import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { IOffer } from '@/models/Offer';
import { OfferRequestParams } from '@/models/PageRequestParams';

import { OffersData } from '../../hooks/types';

export interface OfferContainerProps {
  title: string;
  getOffers: {
    loading: boolean;
    data: OffersData | null;
    handleGetOffers: (offerRequestParams?: OfferRequestParams) => Promise<void>;
  };
}

export interface GetOffersProps {
  offerType?: OfferType;
  offerStatus?: OfferStatus;
}

export interface OfferProps {
  offer: IOffer;
  handleGetOffers: (offerRequestParams?: OfferRequestParams) => Promise<void>;
  filters?: OfferRequestParams;
}
