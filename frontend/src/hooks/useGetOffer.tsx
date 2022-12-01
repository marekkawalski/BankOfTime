import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useServices } from '../context/ServicesContext';
import { IOffer } from '../models/Offer';
import { UseGetOfferProps } from './types';

function useGetOffer({ setMyToast, reload, id }: UseGetOfferProps) {
  const [offer, setOffer] = useState<IOffer>();
  const params = useParams();
  const services = useServices();
  useEffect(() => {
    handleGetOffer();
    if (!services) return;
  }, [reload]);

  const handleGetOffer = async () => {
    let result: any;
    if (!params.id && !id) {
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
      result = await services.offerService.getOfferById(
        id ?? parseInt(params.id as string)
      );
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
  return { offer };
}

export default useGetOffer;
