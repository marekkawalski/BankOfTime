import { useEffect, useState } from 'react';

import { useServices } from '../context/ServicesContext';
import { useMyToast } from '../context/ToastContext';
import { ToastBackground } from '../enums/ToastBackground';
import { ToastTitle } from '../enums/ToastTitle';
import { IOffer } from '../models/Offer';
import { UseGetAppUserOffersProps } from './types';

const useGetAppUserChosenOffers = ({ offerType }: UseGetAppUserOffersProps) => {
  const services = useServices();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useMyToast();

  useEffect(() => {
    handleGetOffers();
  }, [offerType, services]);

  const handleGetOffers = async () => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = await services.offerService.findAllOffersChosenByAppUser(
        services.appUserService.getAppUser().id
      );
      setLoading(false);
      if (result.status === 200) {
        setOffers(result?.data ?? []);
      } else if (result.status === 204) {
        toast?.make(ToastTitle.INFO, ToastBackground.WARNING, "No offers");
      }
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, "No offers");
    }
  };
  return { loading, offers, handleGetOffers };
};

export default useGetAppUserChosenOffers;
