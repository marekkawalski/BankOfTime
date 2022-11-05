import React, { useEffect, useState } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';
import AppUserService from '../../services/AppUserService';
import OfferService from '../../services/OfferService';

function AppUserSellOffers() {
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
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
      <OfferContainer title="SellOffers" offers={sellOffers} />
    </div>
  );
}

export default AppUserSellOffers;
