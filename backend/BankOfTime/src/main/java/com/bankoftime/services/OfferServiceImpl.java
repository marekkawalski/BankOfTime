package com.bankoftime.services;

import com.bankoftime.models.Offer;
import com.bankoftime.repositories.OfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class OfferServiceImpl implements OfferService {
    private final OfferRepository offerRepository;

    public OfferServiceImpl(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    @Transactional
    @Override
    public Optional<Offer> createOffer(Offer offer) {
        return Optional.of(offerRepository.save(offer));
    }

    @Override
    public Optional<Offer> findOffer(Long id) {
        return offerRepository.findById(id);
    }

}
