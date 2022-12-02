import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { IUpdateOffer } from '@/models/Offer';
import React, { useState } from 'react';

function useEditOffer() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  const handleSubmit = async <T,>(offer: T) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.offerService.updateOffer(
        offer as IUpdateOffer
      );
      setLoading(false);
      if (resp.status === 200) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "Offer has been updated"
        );
      } else {
        toast?.make(
          ToastTitle.ERROR,
          ToastBackground.ERROR,
          "An error occurred"
        );
      }
    } catch (e: any) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, e as string);
      console.log(e);
    }
  };
  return { loading, handleSubmit };
}

export default useEditOffer;
