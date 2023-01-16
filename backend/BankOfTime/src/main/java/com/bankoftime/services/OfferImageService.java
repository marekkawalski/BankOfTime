package com.bankoftime.services;

import com.bankoftime.models.OfferImage;

import java.util.List;

public interface OfferImageService {
    void saveImages(List<OfferImage> images);

    List<OfferImage> findPhotos(Long offerId);
}
