import { useServices } from '@/context/ServicesContext';
import { useMyToast } from '@/context/ToastContext';
import { ToastBackground } from '@/enums/ToastBackground';
import { ToastTitle } from '@/enums/ToastTitle';
import { ICreateOffer } from '@/models/Offer';
import { useState } from 'react';

function useCreateOffer() {
  const [loading, setLoading] = useState<boolean>(false);
  const services = useServices();
  const toast = useMyToast();

  const handleSubmit = async (offer: ICreateOffer) => {
    try {
      setLoading(true);
      if (services === undefined) return;
      const formData = new FormData();
      for (let image of offer.offerImages) {
        formData.append(
          "offerImages",
          new Blob([image ?? ""], {
            type: "multipart/form-data",
          })
        );
      }
      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              title: offer.title,
              shortDescription: offer.shortDescription,
              price: offer.price,
              offerType: offer.offerType,
              longDescription: offer.longDescription,
              location: offer.location,
              categories: offer.categories,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      const resp = await services.offerService.createOffer(formData);

      if (resp.status === 201) {
        toast?.make(
          ToastTitle.SUCCESS,
          ToastBackground.SUCCESS,
          "Offer has been created"
        );
      } else {
        toast?.make(
          ToastTitle.ERROR,
          ToastBackground.ERROR,
          "An error occurred"
        );
      }
    } catch (e: any) {
      toast?.make(
        ToastTitle.ERROR,
        ToastBackground.ERROR,
        e?.error ??
          e?.message?.response?.data?.toString() ??
          e?.message?.message?.toString()
      );
      console.log(e);
    }
    setLoading(false);
  };
  return { loading, handleSubmit };
}

export default useCreateOffer;
