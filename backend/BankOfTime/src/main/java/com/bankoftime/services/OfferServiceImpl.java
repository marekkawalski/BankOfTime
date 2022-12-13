package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.OfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.OfferRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public Optional<Offer> createOffer(Offer offer, AppUser appUser) {
        if (offer.getOfferType() == OfferType.SELL_OFFER) {
            offer.setSeller(appUser);
        } else offer.setBuyer(appUser);
        return Optional.of(offerRepository.save(offer));
    }

    @Override
    public Optional<Offer> findOffer(Long offerId) {
        return offerRepository.findById(offerId);
    }

    @Override
    public Offer mapCreateOfferDTOToOffer(CreateOfferDTO createOfferDTO) {
        Offer offer = new Offer();
        offer.setOfferType(createOfferDTO.offerType());
        offer.setPrice(createOfferDTO.price());
        offer.setShortDescription(createOfferDTO.shortDescription());
        offer.setTitle(createOfferDTO.title());
        if (createOfferDTO.location() != null)
            offer.setLocation(createOfferDTO.location());
        if (createOfferDTO.longDescription() != null)
            offer.setLongDescription(createOfferDTO.longDescription());
        return offer;
    }

    @Override
    public Offer mapOfferDTOToOffer(final OfferDTO offerDTO) {
        Offer offer = new Offer();
        offer.setId(offerDTO.id());
        offer.setOfferType(offerDTO.offerType());
        offer.setPrice(offerDTO.price());
        offer.setShortDescription(offerDTO.shortDescription());
        offer.setTitle(offerDTO.title());
        if (offerDTO.location() != null)
            offer.setLocation(offerDTO.location());
        if (offerDTO.longDescription() != null)
            offer.setLongDescription(offerDTO.longDescription());
        return offer;
    }

    @Override
    public List<Offer> getAllSellOffersAssignedToClient(Long sellerId) {
        return offerRepository.findBySellerId(sellerId);
    }

    @Override
    public List<Offer> getAllPurchaseOffersAssignedToClient(Long buyerId) {
        return offerRepository.findByBuyerId(buyerId);
    }

    @Override
    public Optional<Offer> modifyOffer(Offer offerToSave) {
        Optional<Offer> oOffer = offerRepository.findById(offerToSave.getId());
        if (oOffer.isEmpty()) {
            return Optional.empty();
        }
        Offer offer = oOffer.get();
        offer.setTitle(offerToSave.getTitle());
        offer.setOfferType(offerToSave.getOfferType());
        offer.setPrice(offerToSave.getPrice());
        offer.setShortDescription(offerToSave.getShortDescription());
        offer.setLongDescription(offerToSave.getLongDescription());
        offer.setLocation(offerToSave.getLocation());

        offer = offerRepository.save(offer);
        return Optional.of(offer);
    }

    @Override
    public Page<List<Offer>> getSortedPagedAndFilteredOffers(final String sortField, final Integer pageSize, final Integer pageNum, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword) {
        return offerRepository.findAllOffers(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), offerType, offerStatus, keyword);
    }

    @Override
    public Page<List<Offer>> getPagedAndFilteredOffersOwnedByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword) {
        return offerRepository.findAllOffersOwnedByUser(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), userId, offerType, offerStatus, keyword);
    }

    @Override
    public Page<List<Offer>> getPagedAndFilteredOffersChosenByAppUser(final String sortField, final Integer pageSize, final Integer pageNum, final Long userId, final OfferType offerType, final OfferStatus offerStatus, final Sort.Direction sortDirection, final String keyword) {
        return offerRepository.findAllOffersChosenByUser(PageRequest.of(pageNum, pageSize, Sort.by(sortDirection, sortField)), userId, offerType, offerStatus, keyword);
    }
}
