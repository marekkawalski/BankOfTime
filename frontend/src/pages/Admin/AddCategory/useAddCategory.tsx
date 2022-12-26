import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { CategoryToCreate } from '@/models/Category';
import { useState } from 'react';

function useAddCategory() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  const handleSubmit = async (category: CategoryToCreate) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const resp = await services.categoryService.addCategory(category);
      if (resp.status === 201) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "Category has been created"
        );
      }
    } catch (e: any) {
      console.log(e);
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        e?.message?.response?.data?.message as string
      );
    }
    setLoading(false);
  };
  return { loading, handleSubmit };
}

export default useAddCategory;
