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
    const handleGetClientSellOffers = async () => {
      try {
        setLoading(true);
        if (services === undefined) return;
        const result =
          offerType === OfferType.PURCHASE_OFFER
            ? await services.offerService.getAppUserPurchaseOffers(
                services.appUserService.getAppUser().id
              )
            : await services.offerService.getAppUserSellOffers(
                services.appUserService.getAppUser().id
              );
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
    handleGetClientSellOffers();
  }, [offerType, services, setMyToast]);
  return { loading: loading, offers: offers };
};

export default useGetAppUserOffers;
