import { useEffect, useState } from 'react';

import { useServices } from '../../context/ServicesContext';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';

function useGetClientSellOffers(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>
) {
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
        if (result.status === 200) {
          setSellOffers(result?.data ?? []);
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
  }, [services, setMyToast]);
  return { loading: loading, sellOffers: sellOffers };
}

export default useGetClientSellOffers;
