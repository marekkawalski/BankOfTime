import React, { useState } from 'react';

import { useServices } from '../../../../context/ServicesContext';
import { MyToast } from '../../../../models/MyToast';
import { IUpdateOffer } from '../../../../models/Offer';

function useEditOffer(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const handleSubmit = async <T,>(offer: T) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.offerService.updateOffer(
        offer as IUpdateOffer
      );
      setLoading(false);
      if (resp.status === 200) {
        setMyToast({
          background: "success",
          message: "Offer has been updated",
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

export default useEditOffer;
