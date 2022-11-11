import React from 'react';

import { useServices } from '../../context/ServicesContext';
import { MyToast } from '../../models/MyToast';
import { ICreateOffer } from '../../models/Offer';

function useCreateOffer(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const services = useServices();
  const handleSubmit = async (offer: ICreateOffer) => {
    try {
      if (services === undefined) return;
      console.log(offer);
      const resp = await services.offerService.createOffer(offer);
      console.log(resp);
      if (resp.status === 201) {
        setMyToast({
          background: "success",
          message: "Offer has been created",
          title: "Success",
          show: true,
        });
      } else {
        setMyToast({
          background: "danger",
          message: "an error occurred",
          title: "Error",
          show: true,
        });
      }
    } catch (e: any) {
      setMyToast({
        background: "danger",
        message: e.toString(),
        title: "Error",
        show: true,
      });
      console.log(e);
    }
  };
  return handleSubmit;
}

export default useCreateOffer;
