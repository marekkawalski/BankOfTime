import React, { useState } from 'react';

import { useServices } from '../../context/ServicesContext';
import { useMyToast } from '../../context/ToastContext';
import { ToastBackground } from '../../enums/ToastBackground';
import { ToastTitle } from '../../enums/ToastTitle';
import { ICreateOffer } from '../../models/Offer';

function useCreateOffer() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  const handleSubmit = async <T,>(offer: T) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.offerService.createOffer(
        offer as ICreateOffer
      );
      setLoading(false);
      if (resp.status === 201) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "Offer has been created"
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

export default useCreateOffer;
