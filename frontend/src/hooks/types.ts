import { OfferType } from '../enums/OfferType';
import { MyToast } from '../models/MyToast';

export interface UseGetAppUserOffersProps {
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>;
  offerType: OfferType;
}
