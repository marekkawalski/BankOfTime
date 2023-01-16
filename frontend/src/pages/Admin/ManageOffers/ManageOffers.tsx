import OfferContainer from '@/components/OfferContainer/OfferContainer';
import { OfferStatus } from '@/enums/OfferState';
import useGetOffers from '@/hooks/useGetOffers';
import React from 'react';

function ManageOffers() {
  return (
    <section className="offers">
      <OfferContainer
        title="Offers"
        getOffers={useGetOffers({
          offerStatusUrl: `status=${OfferStatus.ACTIVE}&`,
        })}
      />
    </section>
  );
}

export default ManageOffers;
