package com.bankoftime.services.impl;

import com.bankoftime.models.OfferImage;
import com.bankoftime.repositories.OfferImageRepository;
import com.bankoftime.services.OfferImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferImageServiceImpl implements OfferImageService {
    private final OfferImageRepository offerImageRepository;

    public OfferImageServiceImpl(final OfferImageRepository offerImageRepository) {
        this.offerImageRepository = offerImageRepository;
    }

    @Override
    public void saveImages(final List<OfferImage> images) {
        offerImageRepository.saveAll(images);
    }

    @Override
    public List<OfferImage> findPhotos(final Long offerId) {
        return offerImageRepository.findOfferImagesByOfferId(offerId);
    }
}
