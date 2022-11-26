import React from 'react';

import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import useGetOffers from '../../hooks/useGetOffers';

function PurchaseOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  const { loading, offers } = useGetOffers({
    setMyToast: setMyToast,
    offerType: OfferType.PURCHASE_OFFER,
    offerStatus: OfferStatus.ACTIVE,
  });
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={loading}>
        <OfferContainer
          title="PurchaseOffers"
          offers={offers.filter((offer) => offer.state === OfferStatus.ACTIVE)}
        />
      </MySpinner>
    </section>
  );
}

export default PurchaseOffers;
