import { OfferType } from '@/enums/OfferType';
import { Category } from '@/models/Category';
import { IOffer } from '@/models/Offer';

export interface OfferFormProps {
  offer?: IOffer;
  submit: {
    loading: boolean;
    handleSubmit: <T>(offer: T) => Promise<any>;
  };
}

export interface CategoryOption {
  value: Category;
  label: string;
}

export interface OfferToSubmit {
  readonly id?: number;
  title: string;
  shortDescription: string;
  price: number;
  offerType: OfferType;
  longDescription?: string;
  location?: string;
  categories: string[];
}

export interface UseSubmitOfferProps {
  categories?: Category[];
  submit: {
    loading: boolean;
    handleSubmit: <T>(offer: T) => Promise<any>;
  };
}
