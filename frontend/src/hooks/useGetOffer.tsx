import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { IOffer } from '@/models/Offer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UseGetOfferProps } from './types';

function useGetOffer({ reload, id }: UseGetOfferProps) {
  const [offer, setOffer] = useState<IOffer>();
  const params = useParams();
  const services = useServices();
  const toast = useMyToast();

  useEffect(() => {
    handleGetOffer();
    if (!services) return;
  }, [reload]);

  const handleGetOffer = async () => {
    let result: any;
    if (!params.id && !id) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, "no id param");
      return;
    }
    if (!services) return;
    try {
      result = await services.offerService.getOfferById(
        id ?? parseInt(params.id as string)
      );
      setOffer(result?.data ?? {});
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, error as string);
    }
  };
  return { offer };
}

export default useGetOffer;
