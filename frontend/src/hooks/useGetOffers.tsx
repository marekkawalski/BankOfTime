import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { IOffer } from '@/models/Offer';
import { useEffect, useState } from 'react';

import { UseGetOffersProps } from './types';

const useGetOffers = ({ offerType, offerStatus }: UseGetOffersProps) => {
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
      const result = offerStatus
        ? await services.offerService.getAllOffersByTypeAndStatus(
            offerType,
            offerStatus
          )
        : await services.offerService.getAllOffers(offerType);
      console.log(result);
      setLoading(false);
      if (result.status === 200) {
        setOffers(result?.data ?? []);
      } else if (result.status === 204) {
        toast?.make(ToastTitle.INFO, ToastBackground.WARNING, "No offers");
      }
      console.log(result);
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, error as string);
    }
  };
  return { loading, offers, handleGetOffers };
};

export default useGetOffers;
