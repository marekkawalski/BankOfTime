import OfferContainer from '@/components/OfferContainer/OfferContainer';
import { OfferStatus } from '@/enums/OfferState';
import { OfferType } from '@/enums/OfferType';
import useGetOffers from '@/hooks/useGetOffers';
import React from 'react';

function PurchaseOffers() {
  return (
    <section className="offers">
      <OfferContainer
        title="Purchase Offers"
        getOffers={useGetOffers({
          offerTypeUrl: `type=${OfferType.PURCHASE_OFFER}&`,
          offerStatusUrl: `status=${OfferStatus.ACTIVE}&`,
        })}
      />
    </section>
  );
}

export default PurchaseOffers;
