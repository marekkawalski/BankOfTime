import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { useEffect, useState } from 'react';

import useGetAppUser from '../../../hooks/useGetAppUser';
import { TimeTransactionRequestParams, TimeTransactionsData } from './types';

function useGetTimeTransactions() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();
  const [data, setData] = useState<TimeTransactionsData | null>(null);
  const { loggedInAppUser } = useGetAppUser();
  useEffect(() => {
    (async () => {
      await handleGetTimeTransactions({});
    })();
  }, [loggedInAppUser]);

  const handleGetTimeTransactions = async (
    timeTransactionRequestParams: TimeTransactionRequestParams
  ) => {
    try {
      setLoading(true);
      if (services === undefined || loggedInAppUser === undefined) return;
      const resp =
        await services.timeTransactionService.getAppUsersTimeTransactions(
          timeTransactionRequestParams,
          loggedInAppUser.id
        );
      if (resp.status === 204) {
        toast?.make(
          ToastTitle.WARNING,
          ToastBackground.WARNING,
          "No transactions"
        );
      }
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
  return { loading, handleGetTimeTransactions, data };
}

export default useGetTimeTransactions;
