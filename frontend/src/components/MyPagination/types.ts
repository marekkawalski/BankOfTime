import { OffersData } from '@/hooks/types';
import { OfferRequestParams } from '@/services/types';

export interface MyPaginationProps {
  offersData: OffersData | null;
  handleGetOffers: (offerRequestParams: OfferRequestParams) => Promise<void>;
  filters: string;
}
