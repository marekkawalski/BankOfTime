import React, { useState } from 'react';

import { useServices } from '../../context/ServicesContext';
import { MyToast } from '../../models/MyToast';
import { ICreateOffer } from '../../models/Offer';

function useCreateOffer(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const handleSubmit = async (offer: ICreateOffer) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.offerService.createOffer(offer);
      setLoading(false);
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
  return { loading: loading, handleSubmit: handleSubmit };
}

export default useCreateOffer;
