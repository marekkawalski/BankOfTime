import { IOffer } from '@/models/Offer';

export interface UseGetImagesProps {
  offer?: IOffer;
}

export interface ImageProps {
  original: string;
  thumbnail: string;
}
