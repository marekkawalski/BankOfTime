package com.bankoftime.services;

import com.bankoftime.models.Offer;

import java.util.Optional;

public interface OfferService {

    Optional<Offer> createOffer(Offer offer);

    Optional<Offer> findOffer(Long id);

}
