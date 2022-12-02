import React from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import { OfferStatus } from '../../enums/OfferState';
import { OfferType } from '../../enums/OfferType';
import useGetOffers from '../../hooks/useGetOffers';

function PurchaseOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferContainer
        title="PurchaseOffers"
        getOffers={useGetOffers({
          setMyToast: setMyToast,
          offerType: OfferType.PURCHASE_OFFER,
          offerStatus: OfferStatus.ACTIVE,
        })}
      />
    </section>
  );
}

export default PurchaseOffers;
