import React, { useEffect, useState } from 'react';

import MySpinner from '../../components/MySpinner/MySpinner';
import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { OfferContainerFor } from '../../enums/OfferContainerFor';
import { MyToast } from '../../models/MyToast';
import useGetClientSellOffers from './useGetClientSellOffers';

function AppUserSellOffers() {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const { loading, sellOffers } = useGetClientSellOffers();
  console.log(loading);
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
