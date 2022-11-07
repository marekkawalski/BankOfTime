import React, { useEffect, useState } from 'react';

import MyNavbar from '../../components/Navbar/MyNavbar';
import OfferContainer from '../../components/OfferContainer/OfferContainer';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { useServices } from '../../context/ServicesContext';
import { OfferContainerFor } from '../../enums/OfferContainerFor';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';

function AppUserSellOffers() {
  const services = useServices();

  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);

  useEffect(() => {
    const handleGetClientSellOffers = async () => {
      try {
        if (services === undefined) return;
        const result = await services.offerService.getAppUserSellOffers(
          services.appUserService.getAppUser().id
        );
        console.log(result);
        setSellOffers(result?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetClientSellOffers();
  }, [services]);

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
