package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.UpdateOfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Category;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.OfferRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class OfferServiceImpl implements OfferService {
    private final OfferRepository offerRepository;

    private final CategoryService categoryService;

    public OfferServiceImpl(final OfferRepository offerRepository, final CategoryService categoryService) {
        this.offerRepository = offerRepository;
        this.categoryService = categoryService;
    }

    @Override
    public Optional<Offer> createOffer(final Offer offer, final AppUser appUser) {
        if (offer.getOfferType() == OfferType.SELL_OFFER) {
            offer.setSeller(appUser);
        } else offer.setBuyer(appUser);
        offer.setCreatedAt(LocalDateTime.now());
        return Optional.of(offerRepository.save(offer));
    }

    @Override
    public Optional<Offer> findOffer(final Long offerId) {
        return offerRepository.findById(offerId);
    }

    @Override
    public Offer mapCreateOfferDTOToOffer(final CreateOfferDTO createOfferDTO) {
        Offer offer = new Offer();
        offer.setOfferType(createOfferDTO.offerType());
        offer.setPrice(createOfferDTO.price());
        offer.setShortDescription(createOfferDTO.shortDescription());
        offer.setTitle(createOfferDTO.title());
        if (createOfferDTO.location() != null)
            offer.setLocation(createOfferDTO.location());
        if (createOfferDTO.longDescription() != null)
            offer.setLongDescription(createOfferDTO.longDescription());
        offer.setCategories(createOfferDTO.categories().stream().map(categoryService::mapCategoryDtoToCategory).toList());
        log.info(offer.getCategories().toString());
        return offer;
    }

    @Override
    public Offer mapOfferDTOToOffer(final UpdateOfferDTO offerDTO) {
        Offer offer = new Offer();
        offer.setId(offerDTO.id());
        offer.setOfferType(offerDTO.offerType());
        offer.setPrice(offerDTO.price());
        offer.setShortDescription(offerDTO.shortDescription());
        offer.setTitle(offerDTO.title());
        offer.setCategories(offerDTO.categories().stream().map(categoryService::mapCategoryDtoToCategory).toList());
        if (offerDTO.location() != null)
            offer.setLocation(offerDTO.location());
        if (offerDTO.longDescription() != null)
            offer.setLongDescription(offerDTO.longDescription());
        return offer;
    }

    @Override
    public List<Offer> getAllSellOffersAssignedToClient(final Long sellerId) {
        return offerRepository.findBySellerId(sellerId);
    }

    @Override
    public List<Offer> getAllPurchaseOffersAssignedToClient(final Long buyerId) {
        return offerRepository.findByBuyerId(buyerId);
    }

    @Override
    public Optional<Offer> modifyOffer(final @NotNull Offer offerToSave) {
        return offerRepository.findById(offerToSave.getId())
                .map(offer -> {
                    offer.setTitle(offerToSave.getTitle());
                    offer.setOfferType(offerToSave.getOfferType());
                    offer.setPrice(offerToSave.getPrice());
                    offer.setShortDescription(offerToSave.getShortDescription());
                    offer.setLongDescription(offerToSave.getLongDescription());
                    offer.setLocation(offerToSave.getLocation());
                    ArrayList<Category> categories = new ArrayList<>(offerToSave.getCategories());
                    offer.setCategories(categories);
                    offer.setUpdatedAt(LocalDateTime.now());
                    offer = offerRepository.save(offer);
                    return Optional.of(offer);
                })
                .orElse(Optional.empty());
    }

    @Override
    public Page<List<Offer>> getSortedPagedAndFilteredOffers(final String sortField, final Integer pageSize, final Integer pageNum, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category) {
        return offerRepository.findAllOffers(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), offerType, offerStatus, keyword, category);
    }

    @Override
    public Page<List<Offer>> getPagedAndFilteredOffersOwnedByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category) {
        return offerRepository.findAllOffersOwnedByUser(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), userId, offerType, offerStatus, keyword, category);
    }

    @Override
    public void updateDisabledUserOffers(final Long userId) {
        offerRepository.updateDisabledUserOffers(userId);
    }

    @Override
    public Page<List<Offer>> getPagedAndFilteredOffersChosenByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword, final String category) {
        return offerRepository.findAllOffersChosenByUser(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), userId, offerType, offerStatus, keyword, category);
    }


}
