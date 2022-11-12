import { OfferType } from '../../../enums/OfferType';
import { IAppUser } from '../../../models/AppUser';
import { IOffer } from '../../../models/Offer';

export const canEdit = (offer?: IOffer, appUser?: IAppUser): boolean => {
  if (
    (offer?.offerType === OfferType.SELL_OFFER &&
      appUser?.id === offer?.seller?.id) ||
    (offer?.offerType === OfferType.PURCHASE_OFFER &&
      appUser?.id === offer?.buyer?.id)
  ) {
    return true;
  } else {
    return false;
  }
};
