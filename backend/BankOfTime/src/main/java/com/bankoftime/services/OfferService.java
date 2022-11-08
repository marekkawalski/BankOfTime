package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {

    Optional<Offer> createOffer(Offer offer, AppUser appUser);

    Optional<Offer> findOffer(Long offerId);

    Offer mapCreateOffer(CreateOfferDTO createOfferDTO);

    List<Offer> getAllOffersOfType(OfferType offerType);

    List<Offer> getClientSellOffers(Long userId);

    List<Offer> getClientPurchaseOffers(Long userId);

    Optional<Offer> getOneSellOfferOfClient(Long clientId, Long offerId);

    Optional<Offer> getOnePurchaseOfferOfClient(Long clientId, Long offerId);

    Optional<Offer> modifyOffer(Offer offerToSave);

    Optional<Offer> getOfferById(Long offerId);

    boolean deleteOffer(Long offerId);

}
