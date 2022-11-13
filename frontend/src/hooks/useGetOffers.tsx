import { useEffect, useState } from 'react';

import { useServices } from '../context/ServicesContext';
import { IOffer } from '../models/Offer';
import { UseGetAppUserOffersProps } from './types';

const useGetOffers = ({ setMyToast, offerType }: UseGetAppUserOffersProps) => {
  const services = useServices();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetClientSellOffers = async () => {
      try {
        setLoading(true);
        if (services === undefined) return;
        const result = await services.offerService.getAllOffers(offerType);

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
    handleGetClientSellOffers();
  }, [offerType, services, setMyToast]);
  return { loading: loading, offers: offers };
};

export default useGetOffers;
