import { OffersData } from '@/hooks/types';
import { OfferRequestParams } from '@/services/types';

export interface OffersPaginationProps {
  offersData: OffersData | null;
  handleGetOffers: (offerRequestParams: OfferRequestParams) => Promise<void>;
  filters: OfferRequestParams;
}
