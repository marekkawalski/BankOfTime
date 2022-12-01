import { IOffer } from '../../models/Offer';

export interface OfferContainerProps {
  title: string;
  offers: IOffer[];
  reload?: boolean;
}

export interface OfferProps {
  offer: IOffer;
}
