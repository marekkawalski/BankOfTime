import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MyNavbar from '../../components/Navbar/MyNavbar';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { useServices } from '../../context/ServicesContext';
import { OfferType } from '../../enums/OfferType';
import { IAppUser } from '../../models/AppUser';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';
import EditOffer from './EditOffer';
import NoEditOffer from './NoEditOffer/NoEditOffer';
import { ViewOfferDetailsProps } from './types';

function ViewOfferDetails({ offerType }: ViewOfferDetailsProps) {
  const params = useParams();
  const services = useServices();

  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const [offer, setOffer] = useState<IOffer>();
  const [appUser, setAppUser] = useState<IAppUser>();

  useEffect(() => {
    const handleGetOffer = async () => {
      let result: any;
      if (!params.id) {
        console.log("no id param");
        return;
      }
      if (!services) return;
      try {
        result = await services.offerService.getOfferById(parseInt(params.id));
        setOffer(result?.data ?? {});
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetOffer();
    if (!services) return;
    setAppUser(services.appUserService.getAppUser());
  }, [offerType, params.id, services]);

  const canEdit = (): boolean => {
    if (
      (offer?.offerType === OfferType.SELL_OFFER &&
        appUser?.id === offer?.seller?.id) ||
      (offer?.offerType === OfferType.PURCHASE_OFFER &&
        appUser?.id === offer?.buyer?.id)
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <section>
      <MyNavbar />
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
      {canEdit() ? <EditOffer /> : <NoEditOffer offer={offer} />}
    </section>
  );
}

export default ViewOfferDetails;
