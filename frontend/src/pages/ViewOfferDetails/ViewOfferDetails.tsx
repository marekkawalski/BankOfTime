import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MyNavbar from '../../components/Navbar/MyNavbar';
import MyToastComponent from '../../components/Toast/MyToastComponent';
import { OfferType } from '../../enums/OfferType';
import { IAppUser } from '../../models/AppUser';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';
import AppUserService from '../../services/AppUserService';
import OfferService from '../../services/OfferService';
import EditOffer from './EditOffer';
import NoEditOffer from './NoEditOffer';
import { ViewOfferDetailsProps } from './types';

function ViewOfferDetails({ offerType }: ViewOfferDetailsProps) {
  const params = useParams();

  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  const [offer, setOffer] = useState<IOffer>();
  const [appUser, setAppUser] = useState<IAppUser>();

  const handleGetOffer = async () => {
    let result: any;
    if (!params.id) {
      console.log("no id param");
      return;
    }

    if (offerType === OfferType.SELL_OFFER) {
      try {
        result = await OfferService.getAppUserSellOfferById(
          AppUserService.getAppUser().id,
          parseInt(params.id)
        );
        setOffer(result?.data ?? {});
      } catch (error) {
        console.log(error);
      }
    } else if (offerType === OfferType.PURCHASE_OFFER) {
      try {
        result = await OfferService.getAppUserPurchaseOfferById(
          AppUserService.getAppUser().id,
          parseInt(params.id)
        );
        setOffer(result?.data ?? {});
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    handleGetOffer();
    setAppUser(AppUserService.getAppUser());
  }, []);

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
      {canEdit() ? <EditOffer /> : <NoEditOffer />}
    </section>
  );
}

export default ViewOfferDetails;
