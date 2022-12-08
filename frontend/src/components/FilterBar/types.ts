import { OfferRequestParams } from '@/services/types';

export interface FilterBarProps {
  title: string;
  handleGetOffers: (offerRequestParams: OfferRequestParams) => Promise<void>;
}
