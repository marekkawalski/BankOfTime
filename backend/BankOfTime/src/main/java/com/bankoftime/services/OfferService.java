package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.UpdateOfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface OfferService {

    Optional<Offer> createOffer(final Offer offer, final AppUser appUser, final List<MultipartFile> offerImagesData) throws FileException;

    Optional<Offer> findOffer(final Long offerId);

    Offer mapCreateOfferDTOToOffer(final CreateOfferDTO createOfferDTO);

    Offer mapUpdateOfferDTOToOffer(final UpdateOfferDTO OfferDTO);

    List<Offer> getAllSellOffersAssignedToClient(final Long userId);

    List<Offer> getAllPurchaseOffersAssignedToClient(final Long userId);

    Optional<Offer> modifyOffer(final Offer offerToSave);

    Optional<Offer> modifyOffer(@NotNull Offer offerToSave, List<MultipartFile> offerImages) throws FileException;

    Page<List<Offer>> getSortedPagedAndFilteredOffers(final String sortField, final Integer pageSize, final Integer pageNum, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category);

    Page<List<Offer>> getPagedAndFilteredOffersOwnedByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category);


    void updateDisabledUserOffers(final Long userId);

    Page<List<Offer>> getPagedAndFilteredOffersChosenByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category);
}
