import { OfferContainerFor } from '../../enums/OfferContainerFor';
import { IOffer } from '../../models/Offer';

export interface OfferContainerProps {
  title: string;
  offers: IOffer[];
  offerContainerFor: OfferContainerFor;
}
