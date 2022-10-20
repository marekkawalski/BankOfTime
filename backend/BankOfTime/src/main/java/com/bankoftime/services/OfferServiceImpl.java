package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.OfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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


    @Override
    public Offer mapCreateOffer(CreateOfferDTO createOfferDTO) {
        Offer offer = new Offer();
        offer.setOfferType(createOfferDTO.offerType());
        offer.setPrice(createOfferDTO.price());
        offer.setShortDescription(createOfferDTO.shortDescription());
        offer.setTitle(createOfferDTO.title());
        return offer;
    }

    @Override
    public List<Offer> getOffers(OfferType offerType) {
        return offerRepository.findByOfferType(offerType);
    }

}