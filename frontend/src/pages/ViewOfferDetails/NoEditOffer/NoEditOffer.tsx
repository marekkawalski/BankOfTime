import './NoEditOffer.scss';

import React from 'react';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import { useServices } from '../../../context/ServicesContext';
import { NoEditOfferProps } from './types';

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
function NoEditOffer({ offer }: NoEditOfferProps) {
  const services = useServices();

  useEffect(() => {});
  return (
    <section>
      <h3>{offer?.title}</h3>
      <ImageGallery items={images} />
    </section>
  );
}

export default NoEditOffer;
