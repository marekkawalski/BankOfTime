package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {

    Optional<Offer> createOffer(Offer offer);

    Optional<Offer> findOffer(Long id);

    Offer mapCreateOffer(CreateOfferDTO createOfferDTO);

    List<Offer> getAllOffersOfType(OfferType offerType);

    List<Offer> getClientSellOffers(Long userId);

    List<Offer> getClientPurchaseOffers(Long userId);

    Optional<Offer> getOneSellOfferOfClient(Long userId, Long offerId);

    Optional<Offer> getOnePurchaseOfferOfClient(Long userId, Long offerId);

}
