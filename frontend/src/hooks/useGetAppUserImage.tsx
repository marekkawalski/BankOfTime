import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { AppUserImage } from '@/models/AppUserImage';
import { useEffect, useState } from 'react';

import { UseGetAppUserImageProps } from './types';

function useGetAppUserImage({ userToView }: UseGetAppUserImageProps) {
  const services = useServices();
  const [data, setData] = useState<AppUserImage>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useMyToast();

  useEffect(() => {
    if (!userToView) return;
    handleGetAppUserImage(userToView.id);
  }, [services, userToView]);

  const handleGetAppUserImage = async (id: number) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const result = await services.appUserImageService.getAppUserImage(id);
      if (result.status === 200) {
        setData(result?.data);
      }
    } catch (error) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, "An error occurred");
    }
    setLoading(false);
  };
  return { loading, handleGetAppUserImage, data };
}

export default useGetAppUserImage;
