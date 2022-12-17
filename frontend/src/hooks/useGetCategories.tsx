import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { useEffect, useState } from 'react';

import { Category } from '../models/Category';

function useGetCategories() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    (async () => {
      await handleGetCategories();
    })();
  }, []);

  const handleGetCategories = async () => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.categoryService.getAllCategories();
      setLoading(false);
      if (resp.status === 204) {
        toast?.make(
          ToastTitle.WARNING,
          ToastBackground.WARNING,
          "No categories"
        );
      }
      setCategories(resp.data);
    } catch (e: any) {
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, e as string);
      console.log(e);
    }
  };
  return { loading, handleGetCategories, categories };
}

export default useGetCategories;
