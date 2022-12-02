import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { OfferType } from '@/enums/OfferType';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { IOffer } from '@/models/Offer';
import { useEffect, useState } from 'react';

import { UseGetAppUserOffersProps } from './types';

const useGetAppUserOffers = ({ offerType }: UseGetAppUserOffersProps) => {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  useEffect(() => {
    handleGetOffers();
  }, [offerType, services]);

  const handleGetOffers = async () => {
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
        toast?.make(ToastTitle.INFO, ToastBackground.WARNING, "No offers");
      }
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, "An error occurred");
    }
  };
  return { loading, offers, handleGetOffers };
};

export default useGetAppUserOffers;
