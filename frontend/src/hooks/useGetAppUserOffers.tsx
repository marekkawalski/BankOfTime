import { useEffect, useState } from 'react';

import { useServices } from '../context/ServicesContext';
import { OfferType } from '../enums/OfferType';
import { IOffer } from '../models/Offer';
import { UseGetAppUserOffersProps } from './types';

const useGetAppUserOffers = ({
  setMyToast,
  offerType,
}: UseGetAppUserOffersProps) => {
  const services = useServices();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetAppUserOffers();
  }, [offerType, services, setMyToast]);

  const handleGetAppUserOffers = async () => {
    try {
      setLoading(true);
      if (services === undefined) return;
      let result: any;
      if (!offerType) {
        result = await services.offerService.findAllOffersOwnedByAppUser(
          services.appUserService.getAppUser().id
        );
      } else {
        result =
          offerType === OfferType.PURCHASE_OFFER
            ? await services.offerService.findAllOffersOfTypeOwnedByAppUser(
                services.appUserService.getAppUser().id,
                OfferType.PURCHASE_OFFER
              )
            : await services.offerService.findAllOffersOfTypeOwnedByAppUser(
                services.appUserService.getAppUser().id,
                OfferType.SELL_OFFER
              );
      }

      setLoading(false);
      if (result.status === 200) {
        setOffers(result?.data ?? []);
      } else if (result.status === 204) {
        setMyToast({
          background: "warning",
          message: "No offers",
          title: "Info",
          show: true,
        });
      }
    } catch (error) {
      setMyToast({
        background: "danger",
        message: error as string,
        title: "Error",
        show: true,
      });
    }
  };
  return { loading, offers };
};

export default useGetAppUserOffers;
