import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import useGetAppUser from '@/hooks/useGetAppUser';
import { useEffect, useState } from 'react';

function useGetAccountBalance() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();
  const [data, setData] = useState<number>(0.0);
  const { loggedInAppUser } = useGetAppUser();

  useEffect(() => {
    (async () => {
      await handleGetAccountBalance();
    })();
  }, [loggedInAppUser]);

  const handleGetAccountBalance = async () => {
    try {
      setLoading(true);
      if (services === undefined || loggedInAppUser === undefined) return;
      const resp = await services.appUserService.getAppUserAccountBalance(
        loggedInAppUser.id
      );
      setData(resp.data);
    } catch (e: any) {
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        e?.message?.response?.data?.message ?? "An error occurred"
      );
      console.log(e);
    }
    setLoading(false);
  };
  return { loading, handleGetAccountBalance, data };
}

export default useGetAccountBalance;
