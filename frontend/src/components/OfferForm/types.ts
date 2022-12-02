import { IOffer } from '@/models/Offer';

export interface OfferFormProps {
  offer?: IOffer;
  submit: {
    loading: boolean;
    handleSubmit: <T>(offer: T) => Promise<any>;
  };
}
