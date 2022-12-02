import React from 'react';

import OfferContainer from '../../components/OfferContainer/OfferContainer';
import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import useGetOffers from '../../hooks/useGetOffers';

function PurchaseOffers() {
  return (
    <section className="offers">
      <OfferContainer
        title="PurchaseOffers"
        getOffers={useGetOffers({
          offerType: OfferType.PURCHASE_OFFER,
          offerStatus: OfferStatus.ACTIVE,
        })}
      />
    </section>
  );
}

export default PurchaseOffers;
