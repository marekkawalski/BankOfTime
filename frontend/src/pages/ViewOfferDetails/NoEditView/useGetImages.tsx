import DefaultOfferImage from '@/assets/images/defaultOffer.jpg';
import { ImageService } from '@/services/ImageService';
import { useEffect, useState } from 'react';

import { ImageProps, UseGetImagesProps } from './types';

function useGetImages({ offer }: UseGetImagesProps) {
  const [images, setImages] = useState<ImageProps[]>([
    { original: DefaultOfferImage, thumbnail: DefaultOfferImage },
  ]);

  useEffect(() => {
    handleSettingImages();
  }, [offer]);

  const handleSettingImages = (): void => {
    if (!offer || !offer.images || offer.images.length === 0) return;
    const imagesArray: ImageProps[] = [];
    for (const image of offer.images) {
      const tempData = ImageService.convertToImage({
        imageData: image?.photoData,
        defaultImage: DefaultOfferImage,
      });
      imagesArray.push({
        original: tempData,
        thumbnail: tempData,
      });
    }
    setImages(imagesArray);
  };
  return { images };
}

export default useGetImages;
