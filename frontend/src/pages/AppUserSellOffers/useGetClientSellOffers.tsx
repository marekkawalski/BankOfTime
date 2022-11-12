import React, { useEffect, useState } from 'react';

import { useServices } from '../../context/ServicesContext';
import { IOffer } from '../../models/Offer';

function useGetClientSellOffers() {
  const services = useServices();
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetClientSellOffers = async () => {
      try {
        setLoading(true);
        if (services === undefined) return;
        const result = await services.offerService.getAppUserSellOffers(
          services.appUserService.getAppUser().id
        );
        setLoading(false);
        console.log(result);
        setSellOffers(result?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetClientSellOffers();
  }, [services]);
  return { loading: loading, sellOffers: sellOffers };
}

export default useGetClientSellOffers;
