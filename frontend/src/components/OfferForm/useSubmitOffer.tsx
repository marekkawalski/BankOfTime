import { Category } from '@/models/Category';

import { OfferToSubmit, UseSubmitOfferProps } from './types';

function useSubmitOffer({ categories, submit }: UseSubmitOfferProps) {
  const handleSubmitOffer = (offer: OfferToSubmit) => {
    if (!categories) return;
    const chosenCategories: Category[] = [];
    for (const category of categories) {
      for (const categoryString of offer.categories) {
        if (categoryString === category.name) {
          chosenCategories.push(category);
        }
      }
    }
    submit.handleSubmit({
      id: offer.id,
      title: offer.title,
      shortDescription: offer.shortDescription,
      price: offer.price,
      offerType: offer.offerType,
      longDescription: offer.longDescription,
      location: offer.location,
      categories: chosenCategories,
      offerImages: offer.offerImages,
    });
  };
  return { handleSubmitOffer };
}

export default useSubmitOffer;
