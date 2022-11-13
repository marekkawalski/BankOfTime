import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { IOffer } from '../../models/Offer';
import useGetMyToast from './useGetMyToast';

function useGetOffer() {
  const [offer, setOffer] = useState<IOffer>();
  const { myToast, setMyToast } = useGetMyToast();
  const params = useParams();
  const services = useServices();

  useEffect(() => {
    const handleGetOffer = async () => {
      let result: any;
      if (!params.id) {
        setMyToast({
          background: "danger",
          message: "no id param",
          title: "Error",
          show: true,
        });
        return;
      }
      if (!services) return;
      try {
        result = await services.offerService.getOfferById(parseInt(params.id));
        setOffer(result?.data ?? {});
      } catch (error) {
        setMyToast({
          background: "danger",
          message: error as string,
          title: "Error",
          show: true,
        });
      }
    };
    handleGetOffer();
    if (!services) return;
  }, []);
  return { offer };
}

export default useGetOffer;
