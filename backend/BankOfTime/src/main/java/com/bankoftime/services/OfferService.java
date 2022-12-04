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

    List<Offer> getAllSellOffersAssignedToClient(Long userId);

    List<Offer> getAllPurchaseOffersAssignedToClient(Long userId);

    Optional<Offer> modifyOffer(Offer offerToSave);

    List<Offer> getSortedPagedAndFilteredOffers(final String sortField, final Integer pageSize, final Integer pageNum, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection);

    List<Offer> getPagedAndFilteredOffersOwnedByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection);

    List<Offer> getPagedAndFilteredOffersChosenByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection);
}
