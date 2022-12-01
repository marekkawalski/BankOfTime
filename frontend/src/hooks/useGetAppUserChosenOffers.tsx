import { useEffect, useState } from 'react';

import { useServices } from '../context/ServicesContext';
import { IOffer } from '../models/Offer';
import { UseGetAppUserOffersProps } from './types';

const useGetAppUserChosenOffers = ({
  setMyToast,
  offerType,
}: UseGetAppUserOffersProps) => {
  const services = useServices();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetAppUserChosenOffers();
  }, [offerType, services, setMyToast]);

  const handleGetAppUserChosenOffers = async () => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = await services.offerService.findAllOffersChosenByAppUser(
        services.appUserService.getAppUser().id
      );
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

export default useGetAppUserChosenOffers;
