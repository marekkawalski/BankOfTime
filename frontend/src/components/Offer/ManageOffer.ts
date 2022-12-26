import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import { Role } from '@/enums/Role';
import { IAppUser } from '@/models/AppUser';
import { IOffer } from '@/models/Offer';

import { IManageOffer } from './types';

export class ManageOffer implements IManageOffer {
  constructor(private offer: IOffer, private appUser?: IAppUser) {
    this.offer = offer;
    this.appUser = appUser;
  }
  canEdit = (): boolean => {
    if (
      (((this.offer.offerType === OfferType.SELL_OFFER &&
        this.appUser?.id === this.offer?.seller?.id) ||
        (this.offer.offerType === OfferType.PURCHASE_OFFER &&
          this.appUser?.id === this.offer?.buyer?.id)) &&
        this.offer.state === OfferStatus.ACTIVE) ||
      this.appUser?.userType === Role.ROLE_ADMIN
    ) {
      return true;
    } else {
      return false;
    }
  };
  isOfferOwner = (): boolean => {
    if (
      (this.offer.offerType === OfferType.SELL_OFFER &&
        this.appUser?.id === this.offer?.seller?.id) ||
      (this.offer.offerType === OfferType.PURCHASE_OFFER &&
        this.appUser?.id === this.offer?.buyer?.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  isAssignedToOffer = (): boolean => {
    if (
      this.offer.buyer?.id === this.appUser?.id ||
      this.offer.seller?.id === this.appUser?.id
    ) {
      return true;
    } else {
      return false;
    }
  };

  canViewApprovalStatus = (): boolean => {
    if (!this.isOfferOwner && this.isAssignedToOffer()) {
      return true;
    } else {
      return false;
    }
  };
}
