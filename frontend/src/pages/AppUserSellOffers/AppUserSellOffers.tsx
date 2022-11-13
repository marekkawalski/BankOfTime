import React, { useEffect, useState } from 'react';

import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import useGetMyToast from '../../components/Toast/useGetMyToast';
import { OfferContainerFor } from '../../enums/OfferContainerFor';
import useGetClientSellOffers from './useGetClientSellOffers';

function AppUserSellOffers() {
  const { setMyToast, myToast } = useGetMyToast();
  const { loading, sellOffers } = useGetClientSellOffers(setMyToast);
  return (
    <section className="offers">
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <MySpinner show={loading}>
        <OfferContainer
          title="SellOffers"
          offers={sellOffers}
          offerContainerFor={OfferContainerFor.OWNER}
        />
      </MySpinner>
    </section>
  );
}

export default AppUserSellOffers;
