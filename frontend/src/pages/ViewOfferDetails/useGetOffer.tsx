import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { MyToast } from '../../models/MyToast';
import { IOffer } from '../../models/Offer';

function useGetOffer(
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>,
  reload?: boolean
) {
  const [offer, setOffer] = useState<IOffer>();

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
  }, [reload]);
  return { offer };
}

export default useGetOffer;
