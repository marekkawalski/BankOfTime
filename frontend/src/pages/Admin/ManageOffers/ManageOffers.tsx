import OfferContainer from '@/components/OfferContainer/OfferContainer';
import useGetOffers from '@/hooks/useGetOffers';
import React from 'react';

function ManageOffers() {
  return (
    <section className="offers">
      <OfferContainer title="Offers" getOffers={useGetOffers({})} />
    </section>
  );
}

export default ManageOffers;
