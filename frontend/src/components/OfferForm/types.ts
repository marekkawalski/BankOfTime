import { ICreateOffer, IOffer } from '../../models/Offer';

export interface OfferFormProps {
  offer?: IOffer;
  submit: {
    loading: boolean;
    handleSubmit: (offer: ICreateOffer | IOffer) => Promise<any>;
  };
}
