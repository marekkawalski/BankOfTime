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
