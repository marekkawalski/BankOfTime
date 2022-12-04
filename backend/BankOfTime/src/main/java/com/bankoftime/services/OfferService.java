package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.OfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface OfferService {

    Optional<Offer> createOffer(Offer offer, AppUser appUser);

    Optional<Offer> findOffer(Long offerId);

    Offer mapCreateOfferDTOToOffer(CreateOfferDTO createOfferDTO);

    Offer mapOfferDTOToOffer(OfferDTO OfferDTO);

    List<Offer> getAllOffersOfType(OfferType offerType);

    List<Offer> getAllSellOffersAssignedToClient(Long userId);

    List<Offer> getAllPurchaseOffersAssignedToClient(Long userId);

    List<Offer> findAllSellOffersOwnedByUser(Long userId);

    List<Offer> findAllPurchaseOffersOwnedByUser(Long userId);

    List<Offer> findAllOffersOfTypeOwnedByUser(Long userId, OfferType offerType);

    List<Offer> findAllOffersOwnedByUser(Long userId);

    List<Offer> findAllOffersChosenByUser(Long userId);

    Optional<Offer> getOneSellOfferOfClient(Long clientId, Long offerId);

    Optional<Offer> getOnePurchaseOfferOfClient(Long clientId, Long offerId);

    Optional<Offer> modifyOffer(Offer offerToSave);

    Optional<Offer> getOfferById(Long offerId);

    boolean deleteOffer(Long offerId);

    List<Offer> getAllOffersOfTypeAndStatus(OfferType offerType, OfferStatus offerStatus);

    List<Offer> getSortedPagedAndFilteredOffers(String sortField, Integer pageSize, Integer pageNum, OfferStatus offerStatus, Sort.Direction sortDirection);

    List<Offer> getSortedPagedAndFilteredOffersOfType(String sortField, Integer pageSize, Integer pageNum, OfferType offerType, OfferStatus offerStatus, Sort.Direction sortDirection);
}
