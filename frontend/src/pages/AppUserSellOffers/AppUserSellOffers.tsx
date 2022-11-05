import React, { useEffect, useState } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { OfferContainerFor } from '../../enums/OfferContainerFor';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';
import AppUserService from '../../services/AppUserService';
import OfferService from '../../services/OfferService';

function AppUserSellOffers() {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);

  const handleGetClientSellOffers = async () => {
    try {
      const result = await OfferService.getAppUserSellOffers(
        AppUserService.getAppUser().id
      );
      console.log(result);
      setSellOffers(result?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetClientSellOffers();
  }, []);
  return (
    <div>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      <OfferContainer
        title="SellOffers"
        offers={sellOffers}
        offerContainerFor={OfferContainerFor.OWNER}
      />
    </div>
  );
}

export default AppUserSellOffers;
