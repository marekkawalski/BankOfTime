import { OfferRequestParams } from '@/services/types';

export interface FilterBarProps {
  title: string;
  handleGetOffers: (offerRequestParams: OfferRequestParams) => Promise<void>;
  handleSettingFilters: (offerRequestParams: OfferRequestParams) => void;
}
export interface UseSubmitFiltersProps {
  handleGetOffers: (offerRequestParams: OfferRequestParams) => Promise<void>;
  handleSettingFilters: (offerRequestParams: OfferRequestParams) => void;
}
