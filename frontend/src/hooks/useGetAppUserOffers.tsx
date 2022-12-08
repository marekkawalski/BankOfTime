import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { OfferRequestParams } from '@/services/types';
import { useEffect, useState } from 'react';

import { OffersData } from './types';

const useGetAppUserOffers = () => {
  const [data, setData] = useState<OffersData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  useEffect(() => {
    handleGetOffers({});
  }, []);

  const handleGetOffers = async (offerRequestParams: OfferRequestParams) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = await services.offerService.getAppUserOffers(
        offerRequestParams,
        services.appUserService.getAppUser().id
      );

      setLoading(false);
      if (result.status === 200) {
        setData(result?.data ?? {});
      } else if (result.status === 204) {
        toast?.make(ToastTitle.INFO, ToastBackground.WARNING, "No offers");
      }
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, "An error occurred");
    }
  };
  return { loading, data, handleGetOffers };
};

export default useGetAppUserOffers;
