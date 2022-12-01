import { useEffect, useState } from 'react';

import { useServices } from '../context/ServicesContext';
import { IOffer } from '../models/Offer';
import { UseGetOffersProps } from './types';

const useGetOffers = ({
  setMyToast,
  offerType,
  offerStatus,
}: UseGetOffersProps) => {
  const services = useServices();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetOffers();
  }, [offerType, services, setMyToast]);

  const handleGetOffers = async () => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = offerStatus
        ? await services.offerService.getAllOffersByTypeAndStatus(
            offerType,
            offerStatus
          )
        : await services.offerService.getAllOffers(offerType);
      console.log(result);
      setLoading(false);
      if (result.status === 200) {
        setOffers(result?.data ?? []);
      } else if (result.status === 204) {
        setMyToast({
          background: "warning",
          message: "No offers",
          title: "Info",
          show: true,
        });
      }
      console.log(result);
    } catch (error) {
      setMyToast({
        background: "danger",
        message: error as string,
        title: "Error",
        show: true,
      });
    }
  };
  return { loading: loading, offers: offers };
};

export default useGetOffers;
