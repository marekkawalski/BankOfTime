package com.bankoftime.services;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.OfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
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
    public List<Offer> getAllOffersOfType(OfferType offerType) {
        return offerRepository.findByOfferType(offerType);
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
    public List<Offer> findAllSellOffersOwnedByUser(final Long userId) {
        return offerRepository.findAllSellOffersOwnedByUser(userId);
    }

    @Override
    public List<Offer> findAllPurchaseOffersOwnedByUser(final Long userId) {
        return offerRepository.findAllPurchaseOffersOwnedByUser(userId);
    }

    @Override
    public List<Offer> findAllOffersOfTypeOwnedByUser(final Long userId, final OfferType offerType) {
        return offerType == OfferType.SELL_OFFER ?
                findAllSellOffersOwnedByUser(userId) :
                findAllPurchaseOffersOwnedByUser(userId);
    }

    @Override
    public List<Offer> findAllOffersOwnedByUser(final Long userId) {
        return offerRepository.findAllOffersOwnedByUser(userId);
    }

    @Override
    public List<Offer> findAllOffersChosenByUser(final Long userId) {
        return offerRepository.findAllOffersChosenByUser(userId);
    }


    @Override
    public Optional<Offer> getOneSellOfferOfClient(Long sellerId, Long offerId) {
        return offerRepository.findByIdAndSellerId(offerId, sellerId);
    }

    @Override
    public Optional<Offer> getOnePurchaseOfferOfClient(Long buyerId, Long offerId) {
        return offerRepository.findByIdAndBuyerId(offerId, buyerId);
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
    public Optional<Offer> getOfferById(final Long offerId) {
        return offerRepository.findById(offerId);
    }

    @Override
    public boolean deleteOffer(Long offerId) {
        Optional<Offer> oOffer = offerRepository.findById(offerId);
        if (oOffer.isEmpty())
            return false;
        offerRepository.delete(oOffer.get());
        return true;
    }

    @Override
    public List<Offer> getAllOffersOfTypeAndStatus(OfferType offerType, OfferStatus offerStatus) {
        return offerRepository.findByOfferTypeAndState(offerType, offerStatus);
    }

}
