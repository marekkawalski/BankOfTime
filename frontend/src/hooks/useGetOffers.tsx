import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { OfferRequestParams } from '@/models/PageRequestParams';
import { useEffect, useState } from 'react';

import { OffersData } from './types';

const useGetOffers = (defaultOfferRequestParams?: OfferRequestParams) => {
  const [data, setData] = useState<OffersData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  useEffect(() => {
    handleGetOffers(defaultOfferRequestParams);
  }, []);

  const handleGetOffers = async (offerRequestParams?: OfferRequestParams) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = await services.offerService.getOffers({
        ...defaultOfferRequestParams,
        ...offerRequestParams,
      });
      console.log(result);
      if (result.status === 200) {
        setData(result?.data ?? {});
      } else if (result.status === 204) {
        toast?.make(ToastTitle.INFO, ToastBackground.WARNING, "No offers");
      }
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.log(error);
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, error as string);
    }
  };
  return { loading, data, handleGetOffers };
};

export default useGetOffers;
